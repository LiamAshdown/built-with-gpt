<template>
  <div
    class="mx-2
    rounded-md border border-gray-200
    bg-white
    p-4
    sm:px-10
    "
  >
    <template v-if="loading">
      <div class="pointer-events-none">
        <div class="absolute inset-0 flex items-center justify-center z-10">
          <Icon
            name="mdi:loading"
            class="animate-spin"
            size="80"
          />
        </div>
        <div class="opacity-50">
          <slot />
        </div>
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
