<template>
  <div class="relative rounded-2xl bg-black mt-4 mb-8 pb-8">
    <img
      src="~/assets/images/hero-background.svg"
      class="absolute top-0 left-0 w-full h-full object-cover opacity-[0.8]"
      alt="Hero Image"
    >
    <div class="text-gray-50 p-4 z-10 relative">
      <h3 class="text-3xl font-bold mb-2">
        What is <span class="p-1 rounded-lg leading-loose bg-white text-black mr-1">GPT</span>?
      </h3>
      <p class="text-lg">
        GPT stands for Generative Pre-trained Transformer, which is a family of large-scale language models developed by OpenAI.
        These models are designed to generate human-like text by predicting the next word in a sentence given the context of the previous words.
        GPT models use a transformer architecture and are trained on vast amounts of text data using unsupervised learning techniques.
      </p>
    </div>
    <span class="absolute bottom-2 right-2 text-sm text-white">Did you know this was genered by Chat GPT?</span>
  </div>
</template>

<script>
export default {
  name: 'HeroInfoComponent'
}
</script>
