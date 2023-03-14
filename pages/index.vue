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
    const { data } = await useAsyncData('projects', () => $fetch('/api/projects'))

    return {
      projects: data.value.projects
    }
  }
}
</script>
