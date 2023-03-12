<template>
  <div>
    <div class="mb-auto mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <SignInForm
        :loading="loading"
        :errors="errors"
        :alert="alert"
        sub-title="Sign in to your account to start submitting your GPT projects."
        button-text="Sign In"
        @submit="onSignIn"
      />
      <p class="text-gray-500 text-center mt-4">
        Don't have an account? <NuxtLink
          to="/sign-up"
          class="text-black"
        >
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
import { validateEmail, validatePassword } from '@/lib/utils'

import SignInForm from '@/components/authenticate/AuthForm'

export default {
  name: 'SignInPage',
  components: {
    SignInForm
  },
  setup() {
    useHead({
      title: 'Built with GPT - Sign In',
      meta: [
        {
          name: 'description',
          content: 'Sign in to your Built with GPT account'
        }
      ]
    })

    definePageMeta({
      layout: 'authenticate'
    })

    const user = useSupabaseUser()
    const { auth } = useSupabaseAuthClient()
    const route = useRoute()

    const loading = ref(false)
    const alert = ref(null)
    const errors = ref({
      email: null,
      password: null
    })

    if (route.query && route.query.reason) {
      alert.value = {
        type: 'info',
        message: route.query.reason
      }
    }

    const onSignIn = async (form) => {
      try {
        loading.value = true
        errors.value = {
          email: null,
          password: null
        }

        if (!validateEmail(form.email)) {
          errors.value.email = 'Please enter a valid email address'
        }

        if (!validatePassword(form.password)) {
          errors.value.password = 'Please enter a valid password'
        }

        if (errors.value.email || errors.value.password) {
          return
        }

        const response = await auth.signInWithPassword({
          email: form.email,
          password: form.password
        })

        if (response.error) {
          alert.value = {
            type: 'error',
            message: response.error.message
          }
        } else {
          // Authentication was successful
          // Redirect the user to the dashboard
          navigateTo({
            name: 'projects-view'
          })
        }
      } catch (error) {
        // If we get to here this means something has gone wrong on server end or our end
        // Inform the user that something went wrong
        alert.value = {
          type: 'error',
          message: 'Something went wrong. Please try again.'
        }

        console.error(error)
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      errors,
      alert,
      user,
      onSignIn
    }
  }
}
</script>
