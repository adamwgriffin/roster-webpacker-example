<template>
  <section class="ad-type-selection-container">
    <div class="ad-type-selection">
      <ad-type-selection-panel></ad-type-selection-panel>
      <marketing-info :is-listing-ad="productType.name === 'listing'"></marketing-info>
    </div>
  </section>
</template>

<script>
  import AdTypeSelectionPanel from './AdTypeSelectionPanel'
  import MarketingInfo from '../MarketingInfo.vue'
  import Store from '../../data/store'

  export default {
    components: {
      AdTypeSelectionPanel,
      MarketingInfo
    },
    data() {
      return { productType: Store.productType }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/colors.scss";

  .ad-type-selection-container {
    width: 100%;
  }

  .ad-type-selection {
    color: $primary;
  }
</style>
