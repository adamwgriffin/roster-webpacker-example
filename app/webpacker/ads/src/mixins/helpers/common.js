export default {
  computed: {
    isListingAd() {
      return this.productType.name === 'listing'
    }
  }
}
