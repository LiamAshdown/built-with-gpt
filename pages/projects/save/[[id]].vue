<template>
  <div>
    <Card :loading="initialLoading">
      <BaseForm
        :disabled="loading"
        @submit="onSubmit"
      >
        <BaseInput
          v-model="form.title"
          label="Project Title"
          placeholder="My GPT Project"
          hint="The title of your project"
          :error="errors.title"
        />
        <BaseTextArea
          v-model="form.description"
          label="Project Description"
          hint="What is your project about?"
          :error="errors.description"
        />
        <BaseInput
          v-model="form.websiteUrl"
          label="Website URL"
          placeholder="https://example.com"
          hint="The URL of your website. E.g https://google.com"
          :error="errors.websiteUrl"
        />

        <DropZone
          class="mb-2"
          :value="form.image"
          hint="Recommended image size is 300x200 and maximum file size is 4MB."
          :error="errors.image"
          @input="form.image = $event"
        />

        <Alert
          v-if="alert"
          :alert="alert"
        />

        <BaseButton
          text="Save"
          type="submit"
          design="form"
          class="mt-10"
          :loading="loading"
        />
      </BaseForm>
    </Card>
  </div>
</template>

<script>
import BaseInput from '@/components/base/form/Input'
import BaseTextArea from '@/components/base/form/TextArea'
import BaseForm from '@/components/base/form/Form'
import Alert from '@/components/base/Alert'
import Card from '@/components/card/Card'
import BaseButton from '@/components/base/Button'
import DropZone from '@/components/DropZone'
import { validateDescription, validateTitle, validateWebsiteUrl, validateImage } from '~~/lib/utils'

export default {
  name: 'ProjectsSavePage',
  components: {
    BaseForm,
    Alert,
    BaseInput,
    BaseTextArea,
    BaseButton,
    Card,
    DropZone
  },
  setup() {
    useHead({
      title: 'Built with GPT - Save Project',
      meta: [
        {
          name: 'description',
          content: 'Save a project to Built with GPT.'
        }
      ]
    })

    const client = useSupabaseClient()
    const user = useSupabaseUser()

    const route = useRoute()

    /**
     * Get Project
     *
     * @param {Number} id Project Id
     */
    const getProject = async (id) => {
      const { data, error } = await client
        .from('projects')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.value.id)
        .single()

      return { data, error }
    }

    /**
     * Save Form
     *
     * @param {Object} form The form data to save.
     * @returns {Object} An object with `data` and `error` properties.
     */
    const saveProject = async (form) => {

      let flashMessage = 'Project created successfully!'

      if (route.params.id) {
        const { data, error } = await client
          .from('projects')
          .update([
            {
              title: form.title,
              description: form.description,
              image_url: form.image_url,
              website_url: form.website_url,
              user_id: user.value.id
            }
          ])
          .eq('id', route.params.id)

        flashMessage = 'Project updated successfully!'

        return { data, error, flashMessage }
      }

      const { data, error } = await client
        .from('projects')
        .insert([
          {
            title: form.title,
            description: form.description,
            image_url: form.image_url,
            website_url: form.website_url,
            user_id: user.value.id
          }
        ])

      return { data, error, flashMessage }
    }

    /**
     * Upload Image to Supabase Storage Bucket
     *
     * @param {File} file The image file to upload.
     * @returns {Object} An object with `uploadData` and `uploadError` properties.
     */
    const uploadImage = async (file) => {
      // Generate a unique ID for the file without library
      const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      // Upload to 'built-with-gpt' bucket under projects folder
      const { data, error } = await client.storage
        .from('built-with-gpt')
        .upload(`${user.value.id}/projects/${id}`, file)

      return {
        uploadData: data,
        uploadError: error
      }
    }

  /**
   * Get the public URL of an image file in the 'built-with-gpt' bucket.
   *
   * @param {String} path The path of the image file to download.
   * @returns {Object} An object with `downloadData` and `downloadError` properties.
   */
    const getImageURL = (path) => {
      const { data, error } = client.storage
        .from('built-with-gpt')
        .getPublicUrl(path)

      return {
        downloadData: data,
        downloadError: error
      }
    }

    /**
     * Navigate to the projects page.
     *
     * @param {Object} query The query object to pass to the projects page.
     */
    const navigateToProjects = (query) => {
      navigateTo({
        name: 'projects-view',
        query
      })
    }

    definePageMeta({
      layout: 'authenticated',
      middleware: 'auth'
    })

    return {
      saveProject,
      uploadImage,
      getImageURL,
      getProject,
      navigateToProjects
    }
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        image: null,
        websiteUrl: ''
      },
      loading: false,
      initialLoading: !!this.$route.params.id,
      alert: null,
      errors: {}
    }
  },
  async mounted () {
    if (this.$route.params.id) {
      try {
        this.errors = {}
        this.alert = null

        const { data, error } = await this.getProject(this.$route.params.id)

        if (error) {
          throw error
        }

        // Turn the image URL into a File object
        const image = await fetch(data.image_url)

        this.form.image = new File([await image.blob()], data.image_url, {
          type: image.headers.get('content-type')
        })

        this.previousImageUrl = data.image_url

        this.form.title = data.title
        this.form.description = data.description
        this.form.websiteUrl = data.website_url
      } catch (error) {
        let message = 'An error occurred while loading the project.'

        if (error.code) {
          message = 'Cannot find project'
        }

        this.alert = {
          type: 'error',
          message
        }
      } finally {
        this.initialLoading = false
      }
    }
  },
  methods: {
    /**
     * Handle form submission.
     */
    async onSubmit() {
      try {
        this.loading = true
        this.errors = {}
        this.alert = null

        // Validate form
        this.errors.title = validateTitle(this.form.title)
        this.errors.description = validateDescription(this.form.description)
        this.errors.websiteUrl = validateWebsiteUrl(this.form.websiteUrl)
        this.errors.image = validateImage(this.form.image)

        if (this.errors.title || this.errors.description || this.errors.websiteUrl || this.errors.image) {
          return
        }

        // Upload image
        const { uploadData, uploadError } = await this.uploadImage(this.form.image)

        if (uploadError) {
          throw uploadError
        }

        // Download image
        const { downloadData, downloadError } = this.getImageURL(uploadData.path)

        if (downloadError) {
          throw downloadError
        }

        // Save project
        const updates = {
          title: this.form.title,
          description: this.form.description,
          image_url: downloadData.publicUrl,
          website_url: this.form.websiteUrl
        }

        const { error, flashMessage } = await this.saveProject(updates)

        if (error) {
          throw error
        }

        this.navigateToProjects({
          flashMessage,
          flashMessageType: 'success'
        })

      } catch (error) {
        // Display a generic error message.
        this.alert = {
          type: 'error',
          message: 'Something went wrong. Please try again.'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>


