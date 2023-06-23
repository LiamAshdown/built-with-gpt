<template>
  <div class="mb-4">
    <FormLabel
      v-if="label"
      :id="id"
      :text="label"
    />
    <div>
      <VueMultiselect
        :options="options"
        :multiple="true"
        :model-value="modelValue"
        :placeholder="placeholder"
        @update:model-value="$emit('update:modelValue', $event)"
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
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'MultiSelectComponent',
  components: {
    FormLabel,
    VueMultiselect
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
      type: Array,
      required: false,
      default: () => []
    },
    options: {
      type: Array,
      required: true
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

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
