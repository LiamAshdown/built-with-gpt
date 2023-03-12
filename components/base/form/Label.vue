<template>
  <label
    class="
    mb-2 block
    text-sm
    font-medium
    leading-none
    text-gray-700
    font-inter
    "
    :for="id"
  >
    {{ text }}
  </label>
</template>

<script>
export default {
  name: 'LabelComponent',
  props: {
    text: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    }
  }
}
</script>
