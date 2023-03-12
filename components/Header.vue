<template>
  <div
    class="
    flex flex-col gap-3 justify-center text-center
    sm:flex-row sm:justify-between sm:items-center
    nav-item
    p-4
  "
  >
    <div>
      <nuxt-link to="/">
        <Logo />
      </nuxt-link>
    </div>
    <div>
      <MenuList />
    </div>
    <div>
      <BaseButton
        :text="projectText"
        @click="onAddProject"
      />
    </div>
  </div>
</template>

<script>
import MenuList from '@/components/menu/Menu'
import BaseButton from '@/components/base/Button'
import Logo from '@/components/Logo'

export default {
  name: 'HeaderComponent',
  components: {
    MenuList,
    BaseButton,
    Logo
  },
  setup() {
    const { auth } = useSupabaseAuthClient()
    const route = useRoute()

    const projectText = ref('Add Project')

    const updateProjectText = () => {
      if (route.name === 'projects-save-id') {
        projectText.value = 'View Projects'
      } else {
        projectText.value = 'Add Project'
      }
    }

    watch(() => route.path, updateProjectText)

    const onAddProject = async () => {
      if (!(await auth.getUser()).data.user) {
        navigateTo({
          name: 'sign-up'
        })
      } else {
        if (route.name === 'projects-save-id') {
          navigateTo({
            name: 'projects-view'
          })
        } else {
          navigateTo({
            name: 'projects-save-id'
          })
        }
      }
    }

    updateProjectText()

    return {
      onAddProject,
      projectText
    }
  }
}
</script>
