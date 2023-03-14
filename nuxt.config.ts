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
        },
        {
          name: 'description',
          content: 'Discover Inspiring Projects Built with GPT Technology: Find Your Next Idea Here!'
        },
        // Add OG tags
        {
          property: 'og:title',
          content: 'Built with GPT'
        },
        {
          property: 'og:description',
          content: 'Discover Inspiring Projects Built with GPT Technology: Find Your Next Idea Here!'
        },
        {
          property: 'og:image',
          content: process.env.OG_IMAGE_URL
        },
      ],
    }
  }
})
