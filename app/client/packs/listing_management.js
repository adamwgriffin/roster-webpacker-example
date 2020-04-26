/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

// import Vue from 'vue'
// import App from '../app.vue'

// document.addEventListener('DOMContentLoaded', () => {
//   const el = document.body.appendChild(document.createElement('hello'))
//   const app = new Vue({
//     el,
//     render: h => h(App)
//   })

//   console.log(app)
// })


// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>

/* this is the default example that's added when you install Vue using
bundle exec rake webpacker:install:vue */

import '../listing_management/theme.scss'
import Vue from 'vue/dist/vue.esm'
import App from '../listing_management/components/app.vue'
import mcwButton from '@mcwv/button/index.js'
import mcwFAB from '@mcwv/fab/index.js'
Vue.use(mcwButton)
Vue.use(mcwFAB)

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
