/* eslint-disable no-undef */
export default defineNuxtRouteMiddleware(async () => {
    const { auth } = useSupabaseAuthClient()

    if (!(await auth.getUser()).data.user) {
        return navigateTo({
          name: 'sign-in',
          query: {
            reason: 'You must be signed in to access this page'
          }
        })
    }
})
