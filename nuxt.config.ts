// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@nuxtjs/supabase',
    'nuxt-icon'
  ],
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },
  ssr: true,
  routeRules: {
    'index': {
      ssr: true
    },
    'sign-in': {
      static: true
    },
    'sign-out': {
      static: true
    },
  }
})
