<template>
  <div>
    <div class="pb-24">
      <HeroBanner />
      <HeroInfo />
      <ArticleList :articles="projects" />
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/articles/List'
import HeroBanner from '@/components/hero/Hero'
import HeroInfo from '@/components/hero/HeroInfo'

export default {
  name: 'IndexPage',
  components: {
    ArticleList,
    HeroBanner,
    HeroInfo
  },
  async setup () {
    useHead({
      title: 'Built with GPT',
      meta: [
        {
          name: 'description',
          content: 'Find projects built with GPT-3'
        }
      ]
    })

    useServerSeoMeta({
      title: 'Built with GPT',
      ogTitle: 'Built with GPT',
      description: 'Find projects built with GPT-3, DALL-E, and other AI models.',
      ogDescription: 'Find projects built with GPT-3, DALL-E, and other AI models.'
    })

    const client = useSupabaseClient()

    const { data } = await useAsyncData(async () => {
      const { data } = await client
        .from('projects')
        .select('*')
        .order('id', { ascending: false })

      return { data }
    })

    return {
      projects: data.value.data
    }
  }
}
</script>
