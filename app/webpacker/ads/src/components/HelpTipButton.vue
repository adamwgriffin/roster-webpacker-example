/* you can pass any attributes to this that a normal anchor tag would accept, like target="_blank", or even class="" */
<template>
  <a @click="handleOnClick" class="waves-effect btn btn-no-shadow help-tip">
    <slot></slot>
  </a>
</template>

<script>
  import noop from 'lodash-es'

  export default {
    props: {
      onClick: {
        type: Function,
        default: noop
      },

      // in most situations we want to use preventDefault on the click event to stop the page from jumping around
      // but if the button is simply a link we want to turn that off
      preventDefault: {
        type: Boolean,
        default: true
      }
    },

    methods: {
      handleOnClick(e) {
        this.preventDefault && e.preventDefault()
        this.onClick(e)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .help-tip {
    padding-left: 5px;
    padding-right: 5px;
    background-color: #F9F9F9;
    color: #4088C8;
    margin-top: 8px;
    text-transform: none;
    font-size: 14px;
    min-width: 190px;

    @media (min-width: 840px) and (max-width: 980px) {
      font-size: 10px;
      min-width: 130px;
    }
  }
</style>
