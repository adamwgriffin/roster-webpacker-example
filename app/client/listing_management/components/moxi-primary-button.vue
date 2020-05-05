<template>
  <v-btn id="mwc-button" @click="alertMe">Click me</v-btn>
</template>

<script>
import { VBtn } from 'vuetify/lib'

export default {
  components: { VBtn },
  methods: {
    alertMe: () => {
      alert('Clicked mwc-button!')
    }
  }
}
</script>

<style lang="scss" scoped>
// an id adds enough specificity to override the defaults
#mwc-button.v-btn {
  height: 70px;
  background-color: purple;
  padding: 0 70px;
  color: white;
  font-size: 24px;
}
</style>
