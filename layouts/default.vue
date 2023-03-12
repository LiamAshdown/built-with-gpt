<template>
  <div class="container mx-auto">
    <TopHeader />
    <slot />
  </div>
</template>

<script>
import TopHeader from '@/components/Header'

export default {
  name: 'DefaultLayout',
  components: {
    TopHeader
  }
}
</script>
