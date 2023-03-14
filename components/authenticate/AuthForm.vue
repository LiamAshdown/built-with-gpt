<template>
  <Card class="py-10">
    <div class="flex items-center justify-center gap-2">
      <Logo /> <span class="font-bold text-2xl">is free to use</span>
    </div>
    <p class="text-sm text-center text-gray-500 font-inter font-thin mt-2">
      {{ subTitle }}
    </p>
    <hr class="my-4">
    <BaseForm
      :disabled="loading"
      @submit="onSubmitHandler"
    >
      <BaseInput
        v-model="form.email"
        label="Email Address"
        placeholder="johndoe@example.com"
        :error="errors.email"
      />
      <BaseInput
        v-model="form.password"
        label="Password"
        type="password"
        :error="errors.password"
      />

      <template v-if="alert !== null">
        <Alert
          :alert="alert"
        />
      </template>

      <BaseButton
        :text="buttonText"
        type="submit"
        design="form"
        :loading="loading"
      />

      <hr class="my-4 border-1 border-gray-200">

      <Provider @click="onSubmitProviderHandler('github')" />
    </BaseForm>
  </Card>
</template>

<script>
import BaseInput from '@/components/base/form/Input'
import BaseForm from '@/components/base/form/Form'
import Alert from '@/components/base/Alert'
import BaseButton from '@/components/base/Button'
import Logo from '@/components/Logo'
import Provider from '@/components/providers/Provider'

export default {
  name: 'SignInFormComponent',
  components: {
    BaseForm,
    Alert,
    BaseInput,
    BaseButton,
    Logo,
    Provider
  },
  props: {
    submit: {
      type: Function,
      required: false,
      default: null
    },
    submitProvider: {
      type: Function,
      required: false,
      default: null
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    errors: {
      type: Object,
      required: false,
      default: null
    },
    alert: {
      type: Object,
      required: false,
      default: null
    },
    subTitle: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    }
  },
  emits: ['submit', 'submitProvider'],
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmitHandler () {
      this.$emit('submit', this.form)
    },
    onSubmitProviderHandler (provider) {
      this.$emit('submitProvider', provider)
    }
  }
}
</script>
