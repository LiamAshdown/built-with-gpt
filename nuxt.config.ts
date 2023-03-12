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
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Bult with GPT'
    }
  }
})
