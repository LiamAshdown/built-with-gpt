<template>
  <div>
    <template v-if="articles.length">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ArticleItem
          v-for="article in articles"
          :key="article.id"
          v-in-view="'in-view'"
          :article="article"
        />
      </div>
    </template>
    <template v-else>
      <div class="text-center text-gray-500 font-inter text-lg">
        No projects found.
        <br>
        Have you got a project you want to share?
        <NuxtLink
          to="/projects/save"
          class="text-black hover:text-gray-700 font-bold"
        >
          Add it here
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script>
import ArticleItem from '@/components/articles/Item'

export default {
  name: 'ArticleListComponent',
  components: {
    ArticleItem
  },
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>
