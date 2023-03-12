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
    ">
    <a href="/">{{ text }}</a>
  </li>
</template>

<script>
export default {
  name: 'MenuItemComponent',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
