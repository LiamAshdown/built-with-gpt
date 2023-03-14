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

    const { data } = await useAsyncData('projects', () => $fetch('/api/projects'))

    return {
      projects: data.value.projects
    }
  }
}
</script>
