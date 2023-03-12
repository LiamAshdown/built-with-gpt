<template>
  <div class="mt-10">
    <h1 class="text-3xl font-bold text-center">
      Your Projects
    </h1>
    <p class="text-center">
      Here you can see all your projects
    </p>
    <Card class="mt-4">
      <Alert
        v-if="alert"
        :alert="alert"
      />
      <ProjectsTable
        :projects="projects"
        :loading="loading"
        @delete-project="toggleDeleteModal"
      />
    </Card>

    <ConfirmationModal
      :show="showDeleteModal"
      @confirm="deleteProject"
      @toggle="toggleDeleteModal"
    />
  </div>
</template>

<script>
import ProjectsTable from "@/components/projects/Table"
import Card from "@/components/Card/Card"
import Alert from "@/components/base/Alert"
import ConfirmationModal from "@/components/modal/Confirmation"

export default {
  name: "ViewProjectsPage",
  components: {
    ProjectsTable,
    Card,
    Alert,
    ConfirmationModal,
  },
  setup() {
    const client = useSupabaseClient()

    const projects = ref([])
    const loading = ref(true)
    const alert = ref(null)
    const deleteId = ref(null)
    const showDeleteModal = computed(() => deleteId.value !== null)
    const route = useRoute()

    /**
     * Toggles the `deleteId` variable between null and the ID of the project that is to be deleted.
     * If an `id` parameter is passed, it sets the `deleteId` variable to that value.
     * @param {string} id - The ID of the project to be deleted.
     */
    const toggleDeleteModal = (id) => {
      deleteId.value = id || null
    }

    /**
   * Retrieves the user's projects from the Supabase database using the `client` instance.
   * Sets the `projects` variable to the retrieved data or shows an error message in the `alert` variable if there is an error.
   */
    const getProjects = async () => {
      try {
        const { data } = await client.from("projects").select("*")
        projects.value = data
      } catch (error) {
        alert.value = {
          type: "error",
          message: "Something went wrong. Please try again later.",
        }
      }
      loading.value = false
    }

    /**
   * Deletes the project with the ID specified by `deleteId` from the Supabase database using the `client` instance.
   * Shows a success message in the `alert` variable if the deletion is successful, or an error message if there is an error.
   * Calls the `getProjects()` function to update the project list and sets the `deleteId` variable to null.
   */
    const deleteProject = async () => {
      try {
        const { error } = await client
          .from("projects")
          .delete()
          .eq("id", deleteId.value)

        if (error) {
          throw error
        }

        alert.value = {
          type: "success",
          message: "Project deleted successfully.",
        }

        getProjects()

        deleteId.value = null

      } catch (error) {
        alert.value = {
          type: 'error',
          message: 'Something went wrong. Please try again later.'
        }
      }
    }

    onMounted(() => {
      if (route.query && route.query.flashMessage) {
        alert.value = {
          type: route.query.flashMessageType,
          message: route.query.flashMessage
        }
      }

      getProjects()
    })

    definePageMeta({
      layout: "authenticated",
      middleware: "auth",
    })

    return {
      projects,
      loading,
      alert,
      toggleDeleteModal,
      deleteProject,
      showDeleteModal
    }
  }
}
</script>
