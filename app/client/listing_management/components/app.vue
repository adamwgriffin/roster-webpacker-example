<template>
  <div id="app">
    <h1>Using Material Components Web With Vue</h1>
    <div class="moxi-primary-button">
      <moxi-primary-button></moxi-primary-button>
    </div>
  </div>
</template>

<script>
import MoxiPrimaryButton from "./moxi-primary-button";

export default {
  components: { MoxiPrimaryButton },
  computed: {
    testArray() {
      const arr = [1, 2, 3, 4, NaN]
      return arr.includes(1)
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 2em;
  text-align: center;
}

.moxi-primary-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
