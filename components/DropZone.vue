<template>
  <div>
    <div
      class="dropzone border-2 border-dashed border-gray-400 p-4"
      :class="{
        'border-blue-500': isDragging,
        'border-red-500': error !== null
      }"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
      @click="$refs.fileInput.click()"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFileSelected"
      >
      <div v-if="!value">
        <p class="text-center text-gray-500">
          Drop your file here or click to select a file
        </p>
      </div>
      <div v-else>
        <img
          :src="previewUrl"
          class="mx-auto max-w-full max-h-60"
        >
        <div class="text-center mt-2">
          <p class="text-gray-500">
            {{ imageName }}
          </p>
          <p class="text-gray-500">
            {{ value.size }} bytes
          </p>
          <button
            class="text-blue-500"
            @click.stop="() => $emit('input', null)"
          >
            Remove
          </button>
        </div>
      </div>
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
export default {
  props: {
    value: {
      type: File,
      default: null
    },
    hint: {
      type: String,
      required: false,
      default: null
    },
    error: {
      type: String,
      required: false,
      default: null
    }
  },
  emits: ['input'],
  data() {
    return {
      isDragging: false,
      previewUrl: null
    }
  },
  computed: {
    imageName () {
      // If the image name is a http link, return the last part of the link
      if (this.value.name.includes('http')) {
        return this.value.name.split('/').pop()
      }

      return this.value.name
    }
  },
  mounted () {
    if (this.value) {
      this.readFile(this.value)
    }
  },
  methods: {
    onDragOver(event) {
      event.preventDefault()
      this.isDragging = true
    },
    onDragLeave(event) {
      event.preventDefault()
      this.isDragging = false
    },
    onDrop(event) {
      event.preventDefault()
      this.isDragging = false
      const file = event.dataTransfer.files[0]
      this.readFile(file)
    },
    onFileSelected(event) {
      const file = event.target.files[0]
      this.readFile(file)
    },
    readFile(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        console.log(file.type)
        // Check if the file is an image
        if (file.type.includes('image')) {
          this.previewUrl = reader.result
          this.$emit('input', file)

          return
        }

        // If the file is not an image, set the previewUrl to null
        this.previewUrl = null
      }
    }
  }
}
</script>

<style>
.dropzone {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
