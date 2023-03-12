<template>
  <div>
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
        <div class="border-dashed border-b-2 borde  r-spacing-x-2 border-black">
          <nuxt-img
            :src="article.image_url"
            alt="placeholder"
            class="w-full"
            placeholder
            width="300"
            height="200"
          />
        </div>
        <div class="pt-2 p-4 bg-gray-50">
          <h2 class="text-2xl lg:text-3xl font-bold">
            {{ article.title }}
          </h2>
          <p class="text-base lg:text-lg">
            {{ article.description }}
          </p>
        </div>
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
