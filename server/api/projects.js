import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event)

  const { data } = await client
        .from('projects')
        .select('*')
        .order('id', { ascending: false })

  return {
    projects: data
  }
})
