// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './scss/app.scss'
import Vue from 'vue'
import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  // git rid of annoying warning about running vue in dev mode
  Vue.config.productionTip = false

  /* eslint-disable no-new */
  // this is taken from an explanation on how to use a runtim-only build here:
  // https://github.com/vuejs-templates/webpack/issues/215
  new Vue(App).$mount('#moxi-ads')

  /* this part is normally triggered in roster when someone goes to create an ad */
  document.dispatchEvent(
    new CustomEvent(
      'moxi-ads:opened',
      {
        detail: {
          listingdata: { listingid: 16195190 },
          previousAdData: { uuid: "17c3e201-99f2-4355-aa70-80221dec0e15" },
          productType: { name: "listing" }
        }
      }
    )
  )
})
