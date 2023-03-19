import { serverSupabaseServiceRole, serverSupabaseClient } from '#supabase/server'

/**
 * Retrieves all projects from the Supabase database and returns them in a JSON object.
 *
 * @param {Object} event - The event object passed to the Netlify function.
 * @returns {Object} A JSON object containing the projects retrieved from the database.
 */
export default defineEventHandler(async (event) => {
  // https://stackoverflow.com/questions/75365715/nuxt3-supabase-createclient-server-error-main-createclient-is-not-a-function-o
  // Need to call serverSupabaseClient() to initialize the Supabase client.
  serverSupabaseClient(event)
  // Retrieve a Supabase client instance with service role credentials.
  const client = serverSupabaseServiceRole(event)

  // Retrieve all projects from the 'projects' table in descending order of ID.
  const { data } = await client
        .from('projects')
        .select('*')
        .order('id', { ascending: false })

  // We now need to go through each project and add our ref to the website URL.
  // This is so the owner of the website can see where the traffic is coming from.
  for (const project of data) {
    // Turn the website URL into a URL object.
    const url = new URL(project.website_url)
    // Add a new query parameter to the URL.
    url.searchParams.append('ref', 'builtwithgpt.io')
    // Update the website URL in the project object.
    project.website_url = url.toString()
  }

  // Return the retrieved projects in a JSON object.
  return {
    projects: data
  }
})
