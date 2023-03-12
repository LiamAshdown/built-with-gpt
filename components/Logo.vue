<template>
  <div class="inline">
    <template v-if="!slim">
      <span class="text-2xl font-bold">Built with <span class="p-1 rounded-lg leading-loose bg-black text-white">GPT</span></span>
    </template>
    <template v-else>
      <span class="p-1 rounded-lg leading-loose bg-black text-white">GPT</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'LogoComponent',
  props: {
    slim: {
      type: Boolean,
      default: false
    }
  }
}
</script>
