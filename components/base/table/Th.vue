<template>
  <th
    class="
      px-6 py-3
      text-xs font-bold text-left text-white
      uppercase
      "
    :class="{
      'hidden sm:block': hide
    }"
  >
    {{ text }}
  </th>
</template>

<script>
export default {
  name: 'ThComponent',
  props: {
    text: {
      type: String,
      required: true
    },
    hide: {
      type: Boolean,
      default: false
    }
  }
}
</script>
