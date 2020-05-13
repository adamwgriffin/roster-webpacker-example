<template>
  <button class="moxi-primary-button  mdc-button mdc-button--touch mdc-button--raised">
    <div class="mdc-button__ripple"></div>
    <span class="mdc-button__label">Moxi Primary Button</span>
    <div class="mdc-button__touch"></div>
  </button>
</template>

<script>
import { MDCRipple } from '@material/ripple/index'

export default {
  data() {
    return {
      ripple: null
    }
  },
  mounted() {
    this.ripple = new MDCRipple(this.$el)
  }
}
</script>

<style lang="scss" scoped>
@use '@material/button/mdc-button';
@use "@material/button";

@include button.core-styles;

.moxi-primary-button {
  @include button.filled-accessible(#1661B1);
  @include button.height(38px);
  letter-spacing: 0.08em;
  font-size: 14px;
  font-weight: 400;
}
</style>
