import PromoHeader from '../../components/PromoHeader'

export default {
  components: { PromoHeader },

  computed: {
    promoStyle() {
      switch (this.promoData.promotion_type) {
        case 'brokerage':
          return { backgroundColor: this.companyData.branding.background_color_dark }
        case 'moxiworks':
          return this.promoData.branding_elements.style
      }
      return { backgroundColor: this.companyData.branding.background_color_dark }
    },

    promotionSponsor() {
      switch (this.promoData.promotion_type) {
        case 'brokerage':
          return this.companyData.name
        case 'moxiworks':
          return 'MoxiWorks'
      }
    }
  }
}
