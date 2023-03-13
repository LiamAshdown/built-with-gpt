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
    <div class="flex gap-1">
      <BaseButton
        :text="projectText"
        @click="onAddProject"
      />
      <template v-if="isSignedIn">
        <BaseButton
          text="Sign Out"
          variant="red"
          @click="onSignOut"
        />
      </template>
    </div>
  </div>
</template>

<script>
import MenuList from '@/components/menu/Menu'
import BaseButton from '@/components/base/Button'
import Logo from '@/components/Logo'

/**
 * Header component for the app
 *
 * @component Header
 * @example
 * <Header />
 */
export default {
  name: 'HeaderComponent',
  components: {
    MenuList,
    BaseButton,
    Logo
  },
  setup() {
    const { auth } = useSupabaseAuthClient()
    const user = useSupabaseUser()
    const route = useRoute()

    /**
     * Ref to store the text of the "Add Project" button
     *
     * @memberof HeaderComponent
     * @name projectText
     * @type {Ref<string>}
     */
    const projectText = ref('Add Project')

    /**
     * Updates the text of the "Add Project" button based on the current route
     *
     * @memberof HeaderComponent
     * @function updateProjectText
     * @returns {void}
     */
    const updateProjectText = () => {
      if (route.name === 'projects-save-id') {
        projectText.value = 'View Projects'
      } else {
        projectText.value = 'Add Project'
      }
    }

      /**
     * Handler function for clicking the "Add Project" button
     *
     * @memberof HeaderComponent
     * @function onAddProject
     * @returns {void}
     */
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

    /**
     * Computed property to check if the user is signed in
     *
     * @memberof HeaderComponent
     * @name isSignedIn
     * @type {ComputedRef<boolean>}
     */
    const isSignedIn = computed(() => {
      return user.value !== null
    })

    /**
     * Handler function for clicking the "Sign Out" button
     *
     * @memberof HeaderComponent
     * @function onSignOut
     * @returns {void}
     */
    const onSignOut = async () => {
      await auth.signOut()

      navigateTo({
        name: 'sign-up'
      })
    }

    watch(() => route.path, updateProjectText)

    /**
     * Mounted hook to update the text of the "Add Project" button
     */
    onMounted(() => {
      updateProjectText()
    })

    return {
      onAddProject,
      projectText,
      isSignedIn,
      onSignOut
    }
  }
}
</script>
