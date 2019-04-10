<template>
  <div id="app">
    <advertise-your-listing v-if="productType.name === 'listing'"></advertise-your-listing>
    <advertise-your-services v-if="productType.name === 'service'"></advertise-your-services>
  </div>
</template>

<script>
  import PromoHeader from './components/PromoHeader'
  import AdvertiseYourListing from './components/AdvertiseYourListing'
  import AdvertiseYourServices from './components/AdvertiseYourServices'
  import Store from './data/store'

  export default {
    name: 'app',
    components: {
      PromoHeader,
      AdvertiseYourListing,
      AdvertiseYourServices
    },
    data() {
      return Store
    },
    created() {
      document.addEventListener('moxi-ads:opened', this.mergeDataFromRoster)
    },
    methods: {
      mergeDataFromRoster(e) {
        const { listingdata, previousAdData, productType } = e.detail
        this.listingData = { ...this.listingData, ...listingdata }
        this.previousAdData = { ...this.previousAdData, ...previousAdData }
        this.productType = { ...this.productType, ...productType }
      }
    }
  }
</script>

<style lang="scss">
  .padding-15 {
    padding: 15px;
  }

  #topbar {
    display: flex;
    align-items: center;
    height: 56px;
    background: #212E35;
  }

  #topbar-header {
    padding: 24px;
    font-weight: 300;
    font-size: 16px;
    color: #FFF;
    text-align: center;
    width: 100%;

    span {
      @media (max-width: 550px) { display: none; }
    }

    img {
      padding-left: 3px;
    }
  }

  .moxi-ads-close {
    width: 24px;
  }

  .step-number-header {
    display: none;
    align-items: center;
    height: 45px;
    padding-left: 20px;
    background: #30424D;
    color: white;
    font-weight: 200;
    font-size: 16px;
  }
  @media (max-width: 480px) {
    .step-number-header {
      display: flex;
    }
  }

  #preview-bar {
    background: #F8F8F8;
    flex: 0 0 360px;
  }
</style>
