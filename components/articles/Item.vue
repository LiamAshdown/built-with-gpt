<template>
  <div
    class="
      border-solid border-t-4 border-r-4 border-b-4 border-l-[17px] border-black
      rounded-3xl overflow-hidden min-h-full
      transform
      transition-all
      duration-300
      hover:scale-105
      "
  >
    <div>
      <div
        class="border-dashed border-b-2 border-spacing-x-2 border-black bg-gray-50
      "
      >
        <div class="w-full h-[200px]">
          <nuxt-link
            :to="article.website_url"
            rel="noopener noreferrer"
            target="_blank"
          >
            <nuxt-img
              :src="article.image_url"
              :placeholder="article.placeholder_url || null"
              :alt="article.title"
              class="w-full h-full"
              loading="lazy"
              fit="cover"
            />
          </nuxt-link>
        </div>
      </div>
      <div class="p-4">
        <h2 class="text-2xl font-bold">
          {{ article.title }}
        </h2>
        <p class="text-base">
          {{ article.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleItemComponent',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
