<template>
  <div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-black">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-bold text-left text-white uppercase"
          >
            ID
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-bold text-left text-white uppercase"
          >
            Project Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-bold text-left text-white uppercase"
          >
            Website URL
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-bold text-right text-white uppercase"
          >
            Edit
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-bold text-right text-white uppercase"
          >
            Delete
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <template v-if="loading">
          <tr>
            <td
              class="px-6 py-4 text-center"
              colspan="5"
            >
              <Icon
                name="mdi:loading"
                class="animate-spin"
                size="80"
              />
            </td>
          </tr>
        </template>
        <template v-else-if="!loading && projects.length !== 0">
          <tr
            v-for="project in projects"
            :key="project.id"
          >
            <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
            >
              {{ project.id }}
            </td>
            <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
            >
              {{ project.title }}
            </td>
            <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
            >
              {{ project.website_url }}
            </td>
            <td
              class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
            >
              <nuxt-link
                class="text-green-500 hover:text-green-700"
                :to="{
                  name: 'projects-save-id',
                  params: {
                    id: project.id
                  }
                }"
              >
                Edit
              </nuxt-link>
            </td>
            <td
              class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
            >
              <div
                class="text-red-500 hover:text-red-700 cursor-pointer"
                @click="deleteProject(project.id)"
              >
                Delete
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td
              class="px-6 py-4 text-center"
              colspan="5"
            >
              No projects found.
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProjectsTableComponent',
  props: {
    projects: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['delete-project'],
  methods: {
    deleteProject(id) {
      this.$emit('delete-project', id)
    }
  }
}
</script>
