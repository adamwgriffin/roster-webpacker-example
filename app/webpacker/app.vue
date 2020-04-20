/* this is the default example that's added when you install Vue using
bundle exec rake webpacker:install:vue */

<template>
  <div id="app">
    <p>{{ message }}</p>
    <p>Does es7 work? {{ testArray }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "This message attribute is used inside of a Vue component. Hot module replacement does not reload the page when changing it."
    }
  },
  computed: {
    testArray() {
      const arr = [1, 2, 3, 4, NaN]
      return arr.includes(1)
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
