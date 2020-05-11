<template>
  <div class="button-container">
    <mwc-button
      class="primary-button"
      label="A Material Web Component"
      raised
      @click="alertMe"
    ></mwc-button>
  </div>
</template>

<script>
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
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

 mwc-button {
   --mdc-theme-primary: green;
   --mdc-theme-on-primary: white;
   --mdc-theme-outline-color: red;
   --mdc-button-outline-width: .23rem;
 }
</style>
