module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    '@nuxt/eslint-config',
    'plugin:vue/vue3-essential'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    'defineEventHandler' : 'readonly',
    'defineNuxtPlugin' : 'readonly'
  },
  plugins: [
    'vue'
  ],
  rules: {
  }
}
