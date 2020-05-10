<template>
  <div id="app">
    <h1>Vue With Material Design Web Components</h1>
    <moxi-primary-button></moxi-primary-button>
  </div>
</template>

<script>
import MoxiPrimaryButton from "./moxi-primary-button";

export default {
  components: { MoxiPrimaryButton }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
