<template>
  <div id="ad-image-items">
    <div
      class="ad-image-item"
      v-for="image in imageData"
      v-bind:style="{ backgroundImage: `url(${image.full_url})` }"
      @click="updateImage(image.full_url)"
    >
      <div class="ad-image-item-overlay" v-bind:class="{ selected: image.selected }" @click="changeSelected(image)">
        <div class="ad-image-item-selected-icon">
          <i class="material-icons">done</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Store from '../data/store'

  export default {
    data() {
      return Store
    },
    methods: {
      changeSelected(image) {
        for (let img of Store.imageData) { img.selected = false }
        image.selected = true
      },
      updateImage(imageUrl) {
        Store.adData.imageUrl = imageUrl
        $('#ad-image-overlay-btn').webuiPopover('hide')
      },
      showAdImagesMobile() {
        Store.showImageConPan = !Store.showImageConPan
      }
    }
  }
</script>

<style lang="scss">
  @import "../scss/mixins";

  $ad-item-size: 85px;
  $ad-item-margin: 5px;

  #ad-image-items {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
  }

  .ad-image-item {
    position: relative;
    width: $ad-item-size;
    height: $ad-item-size;
    background: top/cover no-repeat;
    cursor: pointer;
    margin: $ad-item-margin;
  }

  .ad-image-item-selected-icon {
    display: none;
    width: 24px;
    height: 24px;
    float: right;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #4caf50;
    color: white;
    .material-icons { font-size: 14px; }
  }

  .ad-image-item-overlay {
    width: 100%;
    height: 100%;
    padding: 5px;
    &:hover { background: rgba(0, 0, 0, 0.4); }
    &.selected {
      background: rgba(0, 0, 0, 0.4);
      .ad-image-item-selected-icon { display: flex; }
    }
  }
</style>
