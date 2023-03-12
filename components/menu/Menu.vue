<template>
  <ul
    class="
    border-2 border-black border-solid flex rounded-full gap-0 p-1 justify-center relative
  "
    @mouseleave="leave"
  >
    <Item
      text="About"
      link="test"
      @mouseover="hover"
    />
    <Item
      text="Credits"
      link="test"
      @mouseover="hover"
    />
    <Item
      text="Github"
      link="https://github.com/LiamAshdown/built-with-gpt"
      :follow="false"
      @mouseover="hover"
    />
    <li
      ref="bg"
      class="
      absolute bg-black w-20 h-full top-0 left-0 -z-10
      transition-all duration-300 ease-in-out
      rounded-full
      border-2 border-white border-solid
      hidden
      nav-item-bg
      "
    />
  </ul>
</template>

<script>
import Item from '@/components/menu/Item'

export default {
  name: 'MenuComponent',
  components: {
    Item
  },
  methods: {
    hover (event) {
      if (!event.target.classList.contains('nav-item')) {
        return
      }

      // Set bg div to block if it's hidden
      if (this.$refs.bg.style.display === 'none' || this.$refs.bg.style.display === '') {
        this.$refs.bg.style.display = 'block'
      }

      const itemWidth = event.target.offsetWidth
      const leftPos = event.target.getBoundingClientRect().left - this.$refs.bg.parentNode.getBoundingClientRect().left

      this.$refs.bg.style.left = `${leftPos}px`
      this.$refs.bg.style.width = `${itemWidth}px`
    },
    leave () {
      // Hide the bg div
      this.$refs.bg.style.display = 'none'
    }
  }
}
</script>
