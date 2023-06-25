<template>
  <div class="mb-6">
    <div class="text-lg font-bold text-black mb-2 text-center">
      All Categories
    </div>
    <div
      class="
        flex justify-start md:justify-center
        flex-nowrap md:flex-wrap
        overflow-x-auto
        gap-3
        p-2
      "
    >
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="
          px-2 py-1
          text-sm font-bold
          rounded-full
          cursor-pointer
          border-2 border-solid border-black border-opacity-25
          hover:brightness-105
          transition-all duration-300
          box-border
          flex
          items-center
          justify-center
          self-center
          max-w-[200px]
          whitespace-nowrap
        "
        :class="{
          'border-4 m-[-2px]': selectedCategory === category.name,
        }"
        :style="{
          backgroundColor: category.backgroundColor,
          color: category.textColor,
        }"
        @click="onCategoryClick(category.name)"
      >
        <span>
          {{ category.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { projectCategoriesWithColors } from '~~/lib/utils';

export default {
  name: 'ArticleCategories',
  emits: ['filter-category'],
  data() {
    return {
      categories: projectCategoriesWithColors(),
      selectedCategory: null
    }
  },
  methods: {
    onCategoryClick(category) {
      this.selectedCategory = category

      this.$emit('filter-category', category)
    }
  }
}
</script>
