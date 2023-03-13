<template>
  <div class="text-center mb-8">
    <h3 class="text-3xl font-bold">
      Projects built with <Logo slim />
    </h3>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <ArticleItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script>
import ArticleItem from '@/components/articles/Item'
import Logo from '@/components/Logo'

export default {
  name: 'ArticleListComponent',
  components: {
    ArticleItem,
    Logo
  },
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>
