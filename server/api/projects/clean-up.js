import { serverSupabaseServiceRole, serverSupabaseClient } from '#supabase/server'

/**
 * Nuxt.js event handler that deletes unused images from Supabase storage.
 * @param {Object} event - The event object that triggered the handler.
 * @returns {Object} - An object containing an array of updates.
 */
export default defineEventHandler(async (event) => {
  // https://stackoverflow.com/questions/75365715/nuxt3-supabase-createclient-server-error-main-createclient-is-not-a-function-o
  // Need to call serverSupabaseClient() to initialize the Supabase client.
  serverSupabaseClient(event)
  // Retrieve a Supabase client instance with service role credentials.
  const client = serverSupabaseServiceRole(event)

  // Select all users from the 'users' table.
  const { data } = await client.auth.admin.listUsers()

  let updates = []

  for (const user of data.users) {
    // Get all projects for the current user.
    const { data: projects } = await client
          .from('projects')
          .select('*')
          .eq('user_id', user.id)

    if (projects.length === 0) {
      continue
    }

    // Only get the image file name, strip out the URL
    const activeProjectImageIds = projects.map(project => {
      return project.image_url.split('/').pop()
    })

    // Get all images from the storage under the user's folder.
    let { data: images } = await client
          .storage
          .from('built-with-gpt')
          .list(`${user.id}/projects`)

    images = images.map(image => {
      return image.name.split('/').pop()
    })

    // Find any images that are not in the active projects.
    // There's also placeholder e.g -placeholder
    const limboImages = images.filter(image => {
      // If there's a placeholder, remove it.
      const placeholder = image.split('-placeholder').pop()
      if (placeholder) {
        image = image.replace('-placeholder', '')
      }

      return !activeProjectImageIds.includes(image)
  })

    // Delete the limbo images.
    for (const image of limboImages) {
      // Check if the image exists.
      const { data: imageExists } = await client
            .storage
            .from('built-with-gpt')
            .getPublicUrl(`${user.id}/projects/${image}`)

      if (imageExists.length === 0) {
        continue
      }

      const { error } = await client
            .storage
            .from('built-with-gpt')
            .remove([
              `${user.id}/projects/${image}`,
            ])

      if (error) {
        updates.push({
          user: user.id,
          image,
          message: 'Failed to delete'
        })
      } else {
        updates.push({
          user: user.id,
          image,
          message: 'Successfully deleted'
        })
      }
    }
  }

  return {
    updates
  }
})
