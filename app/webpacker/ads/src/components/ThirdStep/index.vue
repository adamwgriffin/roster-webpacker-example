<template src="./template.html"></template>

<script src="./script.js"></script>

<style scoped lang="scss" src="./style.scss"></style>

<style lang="scss">
  /* this is not inside the third_step.scss file because that file is scoped & this fix for the Amazon button seems
  to only work when the CSS is global */
  #AmazonPayButton {
    img {
      max-height: 59px !important;
      width: 264px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
