<template>
  <section>
    <button
      type="submit"
      class="step-0-next btn full-width-mobile-btn btn-no-shadow waves-effect waves-light green"
      @click="selectProduct"
      >
      {{ label }}
    </button>
    <p class="promo-cta" v-if="showPromo">{{promoMessage}}</p>
  </section>
</template>

<script>
  import Store from '../../data/store'
  import Marketing from '../../service/marketing'
  import NavigationHelpers from '../../mixins/helpers/navigation'
  import moment from 'moment'

  export default {
    mixins: [NavigationHelpers],
    props: {
      adType: {
        type: String
      },

      label: {
        type: String
      }
    },
    data() {
      return Store
    },
    computed: {
      promoEndDateDisplay() {
        return moment(this.promoData.end_date).format('MMM DD').toUpperCase()
      },

      promoMessage() {
        const endDateIfAvailable = this.promoData.end_date ? ` UNTIL ${this.promoEndDateDisplay}` : ''
        return `${this.promoData.discount_percentage}% OFF${endDateIfAvailable}`
      }
    },
    methods: {
      selectProduct() {
        if (!this.dataLoading && this.products[this.adType]) {
          this.adData.adType = this.adType
          this.adData.product_uuid = this.products[this.adType]
          Marketing.trackFeatureUsage([this.adType.replace('-', ''), this.listingData.listingid])
          this.nextStep()
        } else if (!this.products[this.adType]) {
          console.error('Product UUID not found for adType: ' + this.adType)
        }
      }
    }
  }
</script>

<style scoped>
  p.promo-cta {
    color: #E01010;
    font-size: 14px;
    font-weight: 600;
  }
</style>
