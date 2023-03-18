import { serverSupabaseClient } from '#supabase/server' // Importing the Supabase client library for server-side use
import sharp from 'sharp' // Importing the sharp library for image manipulation

/**
 * Uploads and compresses an image file to Supabase storage.
 *
 * @param {object} event - The event object containing the HTTP request details.
 * @returns {object} - An object containing the uploaded data or an error message.
 */
export default defineEventHandler(async (event) => {
  // Get a Supabase client object with server service role credentials.
  const client = serverSupabaseClient(event)

  try {
    // Parse the request's multipart form data
    const form = await readMultipartFormData(event)

    // Check if form data exists and has the required fields
    if (!form || !form[0]?.data || !form[1]?.data || !form[2]?.data) {
      throw new Error('Invalid form data')
    }

    const file = form[0].data
    const id = form[1].data
    const userId = form[2].data

    // Resize the image to 1920x1080 resolution with a 16:9 aspect ratio.
    const resized = await sharp(file)
      .resize({
        width: 1920,
        height: 1080,
        fit: 'fill'
      })

    // Convert the resized image to webp format.
    // Webp format is a lossy format, which will result in better compression compared to png or jpeg.
    const webp = await resized.webp({
      quality: 80 // Set the quality of the compressed image to 80%
    })

    // Convert the webp image data to a buffer.
    const webpBuffer = await webp.toBuffer()

    // Upload the new image to the 'built-with-gpt' storage bucket in Supabase, and set type to webp.
    const { data, error } = await client
      .storage
      .from('built-with-gpt')
      .upload(`${userId}/projects/${id}.webp`, webpBuffer, {
        contentType: 'image/webp'
      })

    // Return the response object with the uploaded data or error message.
    return {
      data,
      error
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})
