<template>
  <div id="mobile-media-upload-modal" class="modal">
    <div class="modal-content">
      <h4>Media Upload for Mobile</h4>
      <p class="center-align">
        <button class="waves-effect waves-light btn blue" style="max-width: 100%; padding: 0;"><input type="file" id="hidden-file-input" v-on:change="uploadImages()" /></button>
      </p>
    </div>
  </div>
</template>

<script>
  import Image from '../service/image'

  export default {
    methods: {
      uploadImages() {
        let fileInput = $('#hidden-file-input')
        if (fileInput.val() === '') {
          return false
        }
        // Do image upload
        Image.uploadImage()
        // Empty out the original file input field.
        fileInput.val('')
        // Close the modal
        $('#mobile-media-upload-modal').closeModal()
      }
    }
  }
</script>
