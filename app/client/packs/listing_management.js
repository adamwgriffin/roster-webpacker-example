import Vue from 'vue/dist/vue.esm'
import App from '../listing_management/components/app.vue'

document.addEventListener('DOMContentLoaded', () => {
  // git rid of annoying warning about running vue in dev mode
  Vue.config.productionTip = false

  const app = new Vue({
    el: '#listing-management',
    data: {
      message: "This string is set in the message attribute of the Vue data for this component."
    },
    components: { App }
  })
})
