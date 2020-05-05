<template>
  <v-app>
    <div id="button-container">
      <moxi-primary-button></moxi-primary-button>
    </div>
  </v-app>
</template>

<script>
import { VApp } from 'vuetify/lib'
import MoxiPrimaryButton from "./moxi-primary-button";

export default {
  components: { VApp, MoxiPrimaryButton }
}
</script>

<style scoped>
  #button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
  }
</style>
