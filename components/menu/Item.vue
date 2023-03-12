<template>
  <li
    class="font-bold
    tracking-tighter
    uppercase
    px-4 py-2
    cursor-pointer
    hover:text-white
    transition-all duration-100
    nav-item
    "
  >
    <NuxtLink
      :to="link"
      :rel="!follow ? 'noopener noreferrer' : ''"
    >
      {{ text }}
    </NuxtLink>
  </li>
</template>

<script>
export default {
  name: 'MenuItemComponent',
  props: {
    text: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    follow: {
      type: Boolean,
      default: true
    }
  }
}
</script>
