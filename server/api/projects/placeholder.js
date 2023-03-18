import { serverSupabaseServiceRole, serverSupabaseClient } from '#supabase/server'
import sharp from 'sharp'

/**
 * This function creates a placeholder image for projects in the database that have a null placeholder_url field.
 * The function selects all projects where the placeholder_url field is null, and for each project:
 * - Retrieves the image from the image_url field
 * - Blurs the image using the sharp library
 * - Uploads the blurred image to Supabase Storage
 * - Retrieves the public URL for the uploaded image
 * - Updates the placeholder_url field in the database with the public URL
 * If any errors occur during the process, the function will continue to process the next project and log the error.
 * @param {Object} event - The event object passed to the event handler
 * @returns {Object} - An object containing an array of updates made to the projects in the database
 */
export default defineEventHandler(async (event) => {
  // Initialize Supabase client
  serverSupabaseClient(event)
  // Retrieve a Supabase client instance with service role credentials
  const client = serverSupabaseServiceRole(event)

  // Select all Projects where 'placeholder_url' is null or empty
  const { data } = await client
    .from('projects')
    .select('*')
    .is('placeholder_url', null)

  let updates = []

  for (const project of data) {
    // Extract image ID from image URL
    const imageId = project.image_url.split('/').pop().split('.').shift()
    // Fetch the image
    const image = await fetch(project.image_url)

    // Convert image to a buffer
    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer);

    // Blur the image using sharp library
    const blurredImageBuffer = await sharp(buffer)
      .blur(10)
      .toBuffer();

    // Upload the blurred image to Supabase Storage
    const { data, error } = await client
      .storage
      .from('built-with-gpt')
      .upload(`${project.user_id}/projects/${imageId}-placeholder.webp`, blurredImageBuffer, {
        contentType: 'image/webp',
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      updates.push({
        id: project.id,
        reason: 'Failed to upload placeholder image',
        error
      })

      continue
    }

    // Get URL for the uploaded image
    const { data: publicURLData, error: publicURLError } = await client
      .storage
      .from('built-with-gpt')
      .getPublicUrl(data.path)

    if (publicURLError) {
      updates.push({
        id: project.id,
        reason: 'Failed to get public URL for placeholder image',
        error: publicURLError
      })

      continue
    }

    // Update the project in the database with the public URL for the placeholder image
    const { error: updateError } = await client
      .from('projects')
      .update({
        placeholder_url: publicURLData.publicUrl
      })
      .eq('id', project.id)

    if (updateError) {
      updates.push({
        id: project.id,
        reason: 'Failed to update placeholder_url',
        error: updateError
      })

      continue
    }

    updates.push({
      id: project.id,
      reason: 'Successfully updated placeholder_url'
    })
  }

  return {
    updates
  }
})
