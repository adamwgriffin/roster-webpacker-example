/* The point of this example is to show that we could use the webpacker installed version of
Vue, which is in the package.json in the root directory, while at the same time using a separate
package.json just for your particular pack, such as we are doing here by adding moment */

<template>
  <div id="app">
    <p>{{ message }}</p>
    <p>{{ test }}</p>
    <p>{{ momenttest }}</p>
  </div>
</template>

<script>
/* lodash appears to just be available globally for some reason. not sure why. */
import capitalize from 'lodash/capitalize'
import moment from 'moment'

export default {
  computed: {
    test() {
      return capitalize('lodash capitalize() works because the beginning of this sentence is capitalized.')
    },

    momenttest() {
      return `Moment works, because it's rendering today's date: ${moment().format('MM/DD/YYYY')}`
    }
  },

  data: function () {
    return {
      message: `Here's an example of using a local package.json for a pack with it's own version of Vue. Lodash & 
      Moment.js are also in the package.json and loaded. This demontrates that you can have an entire small app bundled
      as a pack using a local package.json, instead of the global one that's added at the root level by webpacker.`
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
