<template>
  <div>
    <div class="mb-auto mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <SignUpForm
        :loading="loading"
        :errors="errors"
        :alert="alert"
        sub-title="Create your account to start submitting your GPT projects."
        button-text="Sign Up"
        @submit="onSignUp"
        @submit-provider="onSubmitProvider"
      />
      <p class="text-gray-500 text-center mt-4">
        Already have an account? <NuxtLink
          to="/sign-in"
          class="text-black"
        >
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
import { validateEmail, validatePassword } from '@/lib/utils'

import SignUpForm from '@/components/authenticate/AuthForm'

export default {
  name: 'SignUpPage',
  components: {
    SignUpForm
  },
  setup() {
    useHead({
      title: 'Built with GPT - Sign Up',
      meta: [
        {
          name: 'description',
          content: 'Sign up for a Built with GPT account'
        }
      ]
    })

    definePageMeta({
      layout: 'authenticate'
    })

    const user = useSupabaseUser()
    const { auth } = useSupabaseAuthClient()

    const loading = ref(false)
    const alert = ref(null)
    const errors = ref({
      email: null,
      password: null
    })

    const onSubmitProvider = (provider) => {
      auth.signInWithOAuth({
        provider
      })
    }

    const onSignUp = async (form) => {
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

        const response = await auth.signUp({
          email: form.email,
          password: form.password
        })

        console.log(response)

        if (response.error) {
          alert.value = {
            type: 'error',
            message: response.error.message
          }
        }
      } catch {
        // If we get to here this means something has gone wrong on server end or our end
        // Inform the user that something went wrong
        alert.value = {
          type: 'error',
          message: 'Something went wrong. Please try again.'
        }
      } finally {
        loading.value = false
      }
    }

    // There's an issue where it takes a few seconds for the user to be set
    // in the store. So we'll wait for it to be set before navigating
    // This will also prevent the user from seeing the sign in page if they are already signed in
    watchEffect(async () => {
      if (user.value) {
        navigateTo({
          name: 'projects-view'
        })
      }
    })

    return {
      loading,
      errors,
      alert,
      onSignUp,
      onSubmitProvider
    }
  }
}
</script>
