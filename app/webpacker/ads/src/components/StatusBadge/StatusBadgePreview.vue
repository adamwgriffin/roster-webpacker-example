<template>
  <div class="status-badge" :style="badgeColor">
    {{message}}
  </div>
</template>

<script>
  export default {
    props: {
      backgroundColor: {
        type: String,
        required: true
      },

      message: {
        type: String,
        required: true
      }
    },
    computed: {
      badgeColor() {
        return { backgroundColor: this.backgroundColor }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../scss/fonts";

  .status-badge {
    display: inline-block;
    height: 22px;
    padding: 2px 8px;
    color: white;
    font-family: $helvetica-font-stack;
    font-size: 13px;
    font-weight: bold;
  }
</style>
