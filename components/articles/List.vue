<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <ArticleItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
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
