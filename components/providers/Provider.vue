<template>
  <button
    class="bg-white
    rounded-md border border-gray-200
    px-8 py-1
    w-full
    hover:bg-gray-50
    hover:border-gray-300
  "
    type="button"
  >
    <span class="inline-flex items-center gap-1">
      <Icon
        name="mdi:github"
        size="25"
      />
      <span>Sign in with GitHub</span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ProviderComponent'
}
</script>
