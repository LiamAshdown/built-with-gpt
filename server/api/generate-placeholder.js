/**
 * This is responsible for generating a placeholder image for newly created projects.
 */
export default defineEventHandler(async () => {
  const response = await fetch(`${process.env.SUPABASE_FUNCTIONS_URL}/placeholder`)

  return {
    response
  }
})
