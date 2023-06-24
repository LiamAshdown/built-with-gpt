<template>
  <div>
    <div class="pb-24">
      <HeroBanner />
      <HeroInfo />
      <div class="text-center mb-2">
        <h3 class="text-3xl font-bold">
          Projects built with <Logo slim />
        </h3>
      </div>
      <ArticleCategories @filter-category="filterCategory" />
      <ArticleList :articles="filteredProjects" />
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/articles/List'
import ArticleCategories from '@/components/articles/Categories'
import HeroBanner from '@/components/hero/Hero'
import HeroInfo from '@/components/hero/HeroInfo'
import Logo from '@/components/Logo'

export default {
  name: 'IndexPage',
  components: {
    ArticleList,
    ArticleCategories,
    HeroBanner,
    HeroInfo,
    Logo
  },
  async setup () {
    const { data } = await useAsyncData('projects', () => $fetch('/api/projects'))

    const projects = ref(data.value.projects)
    const category = ref('all')

    const filterCategory = (selectedCategory) => {
      category.value = selectedCategory
    }

    const filteredProjects = computed(() => {
      if (category.value === 'all') {
        return projects.value
      }

      return projects.value.filter(project => {
        if (!project.categories) {
          return false
        }

        return project.categories.includes(category.value)
      })
    })

    return {
      filteredProjects,
      filterCategory
    }
  }
}
</script>
