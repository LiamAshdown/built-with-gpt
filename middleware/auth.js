/* eslint-disable no-undef */
export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()

  if (!user.value) {
    return navigateTo({
      name: 'sign-in',
      query: {
        reason: 'You must be signed in to access this page'
      }
    })
  }
})
