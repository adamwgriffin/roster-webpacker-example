<template>
  <div id="side-nav">
    <ol>
      <li
        v-for="(step, index) in steps"
        :key="index"
        is="navigation-sidebar-step"
        :step="step"
        :currentstep="currentstep">
      </li>
    </ol>
    <div v-if="productType.name === 'listing'">
      <div id="listing-preview-lrg">
        <div class="listing-preview">
          <p class="listing-preview-header">My Listing</p>
          <div class="listing-preview-image" v-bind:style="{ backgroundImage: `url(${listingData.main_image})` }"></div>
          <div class="listing-preview-address">
            <span class="listing-preview-address1">{{ adData.addressLine1 }}</span> <br/>
            <span class="listing-preview-address2">{{ adData.addressLine2 }}</span>
          </div>
        </div>
      </div>
      <div id="listing-preview-sm">
        <a id="listing-preview-link" class="material-icons" href="#">image</a>
        <div class="webui-popover-content">
          <div class="listing-preview">
            <div class="listing-preview-image" v-bind:style="{ backgroundImage: `url(${listingData.main_image})` }"></div>
            <div class="listing-preview-address">
              <span class="listing-preview-address1">{{ adData.addressLine1 }}</span> <br/>
              <span class="listing-preview-address2">{{ adData.addressLine2 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavigationSidebarStep from './NavigationSidebarStep'
  import Store from '../data/store'
  import AddressHelpers from '../mixins/helpers/address'

  export default {
    mixins: [AddressHelpers],
    components: {
      NavigationSidebarStep
    },
    data() {
      return Store
    },
    mounted() {
      $('#listing-preview-link').webuiPopover({
        placement: 'horizontal',
        style: 'dark',
        offsetLeft: 15
      })
    }
  }
</script>

<style lang="scss">
  #side-nav {
    background: #30424D;
  }

  #side-header {
    font-size: 20px;
    color: #FFF;
    margin-left: 24px;
    text-transform: capitalize;
    @media (max-width: 1199px) { display: none; }
  }

  #side-nav ol {
    list-style-type: none;
    margin-top: 24px;
    margin-left: 24px;
    padding: 0;
    position: relative;
    @media (min-width: 480px) and (max-width: 1199px) {
      margin: 72px auto 0 auto;
    }
  }

  #side-nav #listing-preview-lrg {
    bottom: 0;
    position: fixed;
    width: 260px;
  }

  #side-nav #listing-preview-sm {
    bottom: 10px;
    position: fixed;
  }

  #side-nav #listing-preview-link {
    color: #FFF;
    font-size: 32px;
    margin-left: 12px;
  }

  .listing-preview {
    margin-bottom: 24px;
  }

  .listing-preview-header {
    font-size: 16px;
    margin: 3px 24px;
    font-weight: 300;
  }

  #listing-preview-lrg .listing-preview-header {
    color: #FFF;
  }

  .listing-preview-image {
    width: 212px;
    height: 130px;
    margin: 0 24px;
    background: top/cover no-repeat;
  }

  .listing-preview-image:after {
    content: "";
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 38%, black 100%);
    display: block;
    position: absolute;
    width: 212px;
    height: 130px;
    bottom: 24px;
  }

  .listing-preview-address {
    margin: 0 24px;
    position: absolute;
    bottom: 24px;
    padding-left: 8px;
  }

  .listing-preview-address1 {
    color: #FFF;
    font-size: 18px;
    font-weight: 300;
  }

  .listing-preview-address2 {
    color: #FFF;
    font-size: 14px;
    font-weight: 200;
  }

  .webui-popover-dark {
    background-color: #30424D;
  }

  .webui-popover-dark .webui-popover-content {
    padding: 14px;
  }

  .webui-popover-dark .arrow:after {
    border-right-color: #30424D !important;
  }

  .webui-popover-dark .listing-preview {
    margin: 0;
  }

  .webui-popover-dark .listing-preview-image {
    margin: 0;
    margin-bottom: 14px;
  }

  .webui-popover-dark .listing-preview-image:after {
    bottom: 14px;
  }
</style>
