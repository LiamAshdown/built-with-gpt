<template>
  <div class="mb-4">
    <FormLabel
      v-if="label"
      :id="id"
      :text="label"
    />
    <div>
      <textarea
        :id="id"
        :value="modelValue"
        :rows="rows"
        class="border border-gray-300
        h-auto
      py-2 px-3
      text-sm
      rounded-md
      h-9
      placeholder:text-gray-400
      hover:border-gray-400
      focus:border-neutral-300
      focus:outline-none
      focus:ring-2
      focus:ring-neutral-800
      ring:ring-offset-1
      w-full
      "
        :class="{
          'border-red-500 border-2': error !== null
        }"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <template v-if="error">
      <div class="mt-1 text-sm text-red-500 font-inter flex items-center gap-1">
        <Icon
          name="heroicons:exclamation-circle"
          size="20"
        />
        {{ error }}
      </div>
    </template>
    <template v-else-if="hint">
      <div class="mt-1 text-xs text-gray-500 font-inter">
        {{ hint }}
      </div>
    </template>
  </div>
</template>

<script>
import FormLabel from '@/components/base/form/Label'

export default {
  name: 'TextAreaComponent',
  components: {
    FormLabel
  },
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: null
    },
    modelValue: {
      type: String,
      required: false,
      default: ''
    },
    error: {
      type: String,
      required: false,
      default: null
    },
    hint: {
      type: String,
      required: false,
      default: null
    },
    rows: {
      type: Number,
      required: false,
      default: 3
    }
  },
  emits: ['update:modelValue'],
  computed: {
    id () {
      return this.label.toLowerCase().replace(' ', '-')
    }
  }
}
</script>
