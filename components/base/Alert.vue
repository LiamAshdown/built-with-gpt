<template>
  <div
    class="
    text-sm
    font-inter
    flex items-center gap-1
    p-2
    my-4
    rounded-md
    "
    :class="{
      'border-red-500 border-2 bg-red-100 text-red-600': alert.type === 'error',
      'border-yellow-500 border-2 bg-yellow-100 text-yellow-600': alert.type === 'warning',
      'border-teal-500 border-2 bg-teal-100 text-teal-600': alert.type === 'info',
      'border-green-500 border-2 bg-green-100 text-green-600': alert.type === 'success',
    }"
  >
    <Icon
      name="heroicons:exclamation-circle"
      size="20"
    />
    {{ alert.message }}
  </div>
</template>

<script>
export default {
  name: 'AlertComponent',
  props: {
    alert: {
      type: Object,
      required: true
    }
  }
}
</script>
