<template>
  <div class="preview-contaner">
    <status-badge-preview :background-color="backgroundColor" :message="message"></status-badge-preview>
  </div>
</template>

<script>
  import StatusBadgePreview from './StatusBadgePreview'

  export default {
    components: { StatusBadgePreview },

    props: {
      backgroundColor: {
        type: String,
        required: true
      },

      message: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .preview-contaner {
    position: absolute;
    top: 0;
    padding: 5px;
  }
</style>
