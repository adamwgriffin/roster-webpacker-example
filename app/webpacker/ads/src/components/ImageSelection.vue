<template>
  <section>
    <div class="grey-text">Image</div>
    <div id="ad-image" v-bind:style="{ backgroundImage: `url(${adData.imageUrl})` }">
      <div class="ad-image-overlay">
        <button id="ad-image-overlay-btn-mobile" @click="toggleConPan('showImageConPan')">Choose Image</button>
        <!-- keep webui-popover-content directly beneath ad-image-overlay-btn otherwise it won't work right -->
        <button id="ad-image-overlay-btn">Choose Image</button>
        <div id="ad-image-items-popover" class="webui-popover-content" v-bind:class="{'ad-image-items-upload': imageUploadEnabled}">
          <image-items></image-items>
          <div id="ad-image-upload-footer" v-if="imageUploadEnabled">
            <button
              id="ad-image-upload-btn"
              class="btn full-width-mobile-btn btn-no-shadow waves-effect waves-light green"
              @click="triggerFilePickerClick"
            >
              Upload Your Own
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="ad-image-items-con-pan" v-bind:class="animateImageConPan">
      <div class="mobile-preview-header">
        <a class="moxi-ads-close-btn" @click="toggleConPan('showImageConPan')">
          <i class="material-icons">keyboard_backspace</i>
        </a>
        Choose Image
      </div>
      <image-items></image-items>
      <div id="ad-image-upload-footer" v-if="imageUploadEnabled">
        <button
          id="ad-image-upload-btn"
          class="btn full-width-mobile-btn btn-no-shadow waves-effect waves-light green"
          @click="triggerFilePickerClick"
        >
          Upload Your Own
        </button>
      </div>
    </div>
    <image-upload-modal></image-upload-modal>
  </section>
</template>

<script>
  import UAparser from 'ua-parser-js'
  import ImageItems from './ImageItems'
  import ImageUploadModal from './ImageUploadModal'
  import Store from '../data/store'
  import ConPanHelpers from '../mixins/helpers/conpan'

  export default {
    name: 'image-upload',
    mixins: [ConPanHelpers],
    components: {
      ImageUploadModal,
      ImageItems
    },
    data() {
      return Store
    },
    created() {
      // stop the sliders from being animated if the user clicks back to this screen
      Store.showImageConPan = null
    },
    computed: {
      animateImageConPan() {
        // TODO: figure out how to avoid using the same method twice. there is one method for preview + this image one
        if (typeof Store.showImageConPan === 'boolean') {
          return Store.showImageConPan ? 'mobile-active' : 'mobile-inactive'
        }
      },
      galleryItems() {
        return Store.imageData
      }
    },
    methods: {
      imageUrl(galleryItem) {
        let hasPhotoGallery = Store.photoGalleryData.hasPhotoGallery
        if (hasPhotoGallery && galleryItem && galleryItem.urls) {
          return galleryItem.urls.full_url
        } else if (galleryItem) {
          return galleryItem.full_url
        } else {
          console.log('Image url not found: ' + galleryItem)
          return ''
        }
      },
      triggerFilePickerClick(type) {
        const parser = new UAparser()
        const filePicker = $('#hidden-file-input')
        filePicker.attr('accept', '')
        if (type === 'images') {
          filePicker.attr('accept', '.jpg, .jpeg, .gif, .png')
        } else if (type === 'pdf') {
          filePicker.attr('accept', '.pdf')
        }
        if (parser.getOS().name === 'iOS' || parser.getOS().name === 'Android') {
          $('#mobile-media-upload-modal').openModal({
            ready: () => {
              $('#hidden-file-input').val('')
            }
          })
        } else {
          filePicker.click()
        }
      }
    },
    mounted() {
      $('.tooltipped').tooltip()
      // it works much better to set the width/height properties here rather than via CSS
      $('#ad-image-overlay-btn').webuiPopover({
        placement: 'auto-top',
        height: '320',
        width: '406',
        padding: false,
        style: 'light',
        animation: 'fade'
      })
    }
  }
</script>

<style scoped lang="scss">
  #ad-image {
    position: relative;
    width: auto;
    padding-top: 56.25%;
    background: #959595 center/cover no-repeat;
    border: solid white 4px ;
    box-shadow: 0 0 7px -1px rgba(0,0,0,0.75);

    @media (max-width: 992px) { margin-bottom: 30px }

    @media (min-width: 2000px) {
      width: 480px;
      height: 270px;
      padding-top: 0;
    }
  }

  .ad-image-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  #ad-image-overlay-btn, #ad-image-overlay-btn-mobile {
    cursor: pointer;
    background: transparent;
    border: solid white 1px;
    min-width: 100px;
    padding: 5px;
    color: white;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 12px;
  }

  #ad-image-upload-footer {
    position: absolute;
    bottom: 0;
    padding: 16px;
    text-align: center;
    width: 100%;
    border-top: 1px solid black;
  }

  #ad-image-upload-btn {
    width: 100%;
  }

  // desktop
  #ad-image-overlay-btn-mobile { display: none; }

  // mobile
  @media (max-width: 768px) {
    #ad-image-overlay-btn-mobile { display: block; }
    #ad-image-overlay-btn { display: none; }
  }

  // Note: when trying to control width/height of popover do it in the options where it is
  // initialized via JS. trying to do it using CSS is PAINFUL!
  #ad-image-items-popover {
    padding: 6px 0;
    overflow: auto;

    #ad-image-items {
      width: 380px;
    }
  }

  .ad-image-items-upload {
    height: 246px;
  }

  #hidden-file-picker {
    position: absolute;
    left: -9999px;
    bottom: 0;
  }
</style>
