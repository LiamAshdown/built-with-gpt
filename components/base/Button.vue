<template>
  <div>
    <button
      class="
    bg-black text-white
    text-center
    transition-all duration-300
    cursor-pointer
    w-full
    "
      :class="{
        'rounded-[32px]': design === 'standard',
        'p-4': design === 'standard',
        'text-small': design === 'standard',
        'uppercase': design === 'standard',
        'md:text-base': design === 'standard',
        'hover:rounded-lg': design === 'standard',
        'font-bold': design === 'standard',

        'px-8 py-2': design === 'form',
        'rounded-lg': design === 'form',
        'text-base': design === 'form',
        'hover:opacity-80': design === 'form',

        'opacity-70': loading,
        'hover:opacity-70': loading,
        'pointer-events-none': loading
      }"
    >
      <template v-if="loading">
        <Icon
          name="svg-spinners:270-ring-with-bg"
          size="20"
          class="mr-2"
        />
      </template>
      <template v-if="link">
        <NuxtLink :to="link">
          {{ text }}
        </NuxtLink>
      </template>
      <template v-else>
        {{ text }}
      </template>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseButtonComponent',
  props: {
    text: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false,
      default: null
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    design: {
      type: String,
      required: false,
      default: 'standard'
    }
  }
}
</script>
