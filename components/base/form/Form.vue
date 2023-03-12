<template>
  <form @submit.prevent="onSubmitHandler">
    <fieldset :disabled="disabled">
      <slot />
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'BaseFormComponent',
  props: {
    submit: {
      type: Function,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['submit'],
  methods: {
    onSubmitHandler () {
      this.$emit('submit')
    }
  }
}
</script>
