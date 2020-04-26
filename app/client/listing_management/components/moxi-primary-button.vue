<template>
  <div id="mwc-button">
    <mwc-button
      class="primary-button"
      label="A Material Web Component"
      outlined
      @click="alertMe"
    ></mwc-button>
  </div>
</template>

<script>
import "@material/theme"
import "@material/mwc-button"

export default {
  methods: {
    alertMe: () => {
      alert('Clicked mwc-button!')
    }
  }
}
</script>

<style lang="scss" scoped>
// @use '@material/button/mdc-button';
// @use '@material/button';

// .foo-button {
//   @include button.container-fill-color(rgb(238, 218, 212));
// }

 /* mwc-button {
   --mdc-theme-primary: green;
   --mdc-theme-on-primary: white;
   --mdc-theme-outline-color: red;
   --mdc-button-outline-width: .23rem;
 } */
</style>
