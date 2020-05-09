<template>
  <div id="app">
    <h1>Web Components Example</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld';

export default {
  components: { HelloWorld }
}
</script>

<style scoped>
#app {
  text-align: center;
}
</style>
