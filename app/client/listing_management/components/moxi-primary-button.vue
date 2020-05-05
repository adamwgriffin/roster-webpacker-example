<template>
  <div id="mwc-button">
    <m-button
      class="primary-button"
      label="A Material Web Component"
      raised
      @click="alertMe"
    >Hello</m-button>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue.esm'
import Button from 'material-components-vue/dist/button'
Vue.use(Button)

export default {
  methods: {
    alertMe: () => {
      alert('Clicked mwc-button!')
    }
  }
}
</script>

<style lang="scss" scoped>
$mdc-theme-primary: green;
$mdc-theme-secondary: #ff1744;
$mdc-theme-background: #f5f5f5;
@import "material-components-vue/dist/button/styles";

#mwc-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
