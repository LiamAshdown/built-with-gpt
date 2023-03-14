<template>
  <div class="container mx-auto">
    <TopHeader />
    <div class="md:pt-10">
      <slot />
    </div>
  </div>
</template>

<script>
import TopHeader from '@/components/Header'

export default {
  name: 'AuthenticatedLayout',
  components: {
    TopHeader
  }
}
</script>
