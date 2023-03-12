/* eslint-disable no-undef */
export default defineNuxtRouteMiddleware(async () => {
    const { auth } = useSupabaseAuthClient()

    if (!(await auth.getUser()).data.user) {
        return navigateTo('/sign-in')
    }
})
