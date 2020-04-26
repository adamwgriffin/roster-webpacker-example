<template>
  <div id="app">
    <p>{{ message }}</p>
    <p>Does es7 work? {{ testArray }}</p>
    <moxi-primary-button></moxi-primary-button>
  </div>
</template>

<script>
import MoxiPrimaryButton from "./moxi-primary-button";

export default {
  components: { MoxiPrimaryButton },
  data: function () {
    return {
      message: "This message attribute is used inside of a Vue component.\
        Hot module replacement does not reload the page when changing it."
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
