<template>
  <div>
    <div>
      <HeroBanner />
      <HeroInfo />
      <ArticleList :articles="projects" />
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/articles/List'
import HeroBanner from '@/components/Hero/Hero'
import HeroInfo from '@/components/Hero/HeroInfo'

export default {
  name: 'IndexPage',
  components: {
    ArticleList,
    HeroBanner,
    HeroInfo
  },
  async setup () {
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
