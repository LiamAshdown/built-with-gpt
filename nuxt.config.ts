// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@nuxtjs/supabase',
    'nuxt-icon'
  ],
  plugins: [
    {
      src: '~/plugins/vercel.js',
      mode: 'client'
    }
  ],
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },
  routeRules: {
    'index': {
      ssr: true
    },
    'sign-in': {
      ssr: true
    },
    'sign-out': {
      ssr: true
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Bult with GPT',
      // Add google site verification
      meta: [
        {
          name: 'google-site-verification',
          content: process.env.GOOGLE_SITE_VERIFICATION
        }
      ]
    }
  }
})
