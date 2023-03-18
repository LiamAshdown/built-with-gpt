/**
 * A Nuxt.js plugin that adds a custom Vue.js directive for tracking when an element is in view.
 *
 * @param {Object} nuxtApp - The Nuxt.js application object.
 * @return {void}
 */
export default defineNuxtPlugin((nuxtApp) => {
  /**
   * The last element that was in view.
   *
   * @type {HTMLElement|null}
   */
  let lastIntersectingElement = null

  /**
   * A Vue.js directive that adds a CSS class to an element when it is in view.
   *
   * @param {HTMLElement} el - The element that the directive is attached to.
   * @param {Object} binding - The binding object that contains the directive's values.
   * @return {void}
   */
  nuxtApp.vueApp.directive('in-view', {

    /**
     * The mounted hook is called when the directive is attached to an element.
     *
     * @param {HTMLElement} el - The element that the directive is attached to.
     * @param {Object} binding - The binding object that contains the directive's values.
     * @return {void}
     */
    mounted (el, binding) {
      /**
       * Options for the IntersectionObserver.
       *
       * @type {Object}
       */
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.90
      }

      /**
       * A new IntersectionObserver that will call the callback when the element is in view.
       *
       * @type {IntersectionObserver}
       */
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (lastIntersectingElement && lastIntersectingElement !== entry.target) {
              lastIntersectingElement.classList.remove(binding.value)
            }
            entry.target.classList.add(binding.value)
            lastIntersectingElement = entry.target
          } else {
            entry.target.classList.remove(binding.value)
          }
        })
      }, options)

      observer.observe(el)
    }
  })
})
