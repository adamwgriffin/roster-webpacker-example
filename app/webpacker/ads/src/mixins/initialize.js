// this is so that CustomEvent will work with IE
import 'custom-event-polyfill'
import isEmpty from 'lodash-es/isEmpty'
import Store from '../data/store'
import { getInitialData } from '../service/app'

const budgetOptionTemplate = (budgetOption) => {
  return `<div data-budget-value='${budgetOption}'>${budgetOption}</div>`
}

export const getBudgetDisplayOptions = (budgetOptions) => {
  return budgetOptions.map((budgetOption) => {
    return budgetOptionTemplate(budgetOption)
  })
}

export const removePromotion = () => {
  Store.promoData = {}
  Store.adData.promoData = {}
  Store.showPromo = false
  Store.budgetOptionsDisplay = getBudgetDisplayOptions(Store.budgetOptions)
  Store.adData.budget = Store.adData.budgetWithoutDiscount
  Store.budgetOption = budgetOptionTemplate(Store.adData.budgetWithoutDiscount)
}

export default {
  methods: {

    initializePromoData(promoData) {
      if (!isEmpty(promoData)) {
        this.promoData = promoData
        this.adData.promoData = promoData
        this.showPromo = true
      }
    },

    setInitialData({productInfo, userData, companyData, promoData}) {
      this.productInfo = { ...this.productInfo, ...productInfo }
      this.userData = { ...this.userData, ...userData }
      this.companyData = { ...this.companyData, ...companyData }
      this.initializePromoData(promoData)
      this.configureBudgetOptions(promoData)
    },

    initializeApp() {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await getInitialData()
          this.setInitialData(res.data)
          resolve(res)
        } catch (error) {
          reject(new Error(`Error getting initial data: ${error}`))
        }
      })
    },

    closeModal() {
      document.dispatchEvent(
        new CustomEvent('moxi-ads:closed')
      )
      this.resetData()
    },

    // strip http:// from destinationUrl for display purposes
    getDisplayUrl(destinationUrl) {
      const parser = document.createElement('a')
      parser.href = destinationUrl
      return parser.hostname
    },

    discountAmount(amount, percent) {
      return (Number(amount) * (100.0 - Number(percent)) / 100.0).toFixed(2)
    },

    /* eslint-disable camelcase */
    defaultPromoBudgetOption({price_points, discount_percentage}) {
      return price_points.includes(Number(this.budgetOptions[1])) ?
        this.discountAmount(this.budgetOptions[1], discount_percentage) :
        this.budgetOptions[1]
    },

    getBudgetDisplayOptionsPromo({ discount_percentage, price_points }) {
      return this.budgetOptions.map((budgetOption) => {
        if (price_points.includes(Number(budgetOption))) {
          const saleBudgetOption = this.discountAmount(budgetOption, discount_percentage)
          return (
            `<div data-budget-value="${budgetOption}" data-budget-sale-value="${saleBudgetOption}">
              <s>${budgetOption}</s> <span class="promo-price">SALE $${saleBudgetOption}</span>
            </div>`
          )
        } else {
          return `<div data-budget-value='${budgetOption}'>${budgetOption}</div>`
        }
      })
    },
    /* eslint-enable camelcase */

    // NOTE: if there is a previous ad then adData.budget will get assigned to again based on the previous ad's budget
    // in ad.js getPreviousAd()
    configureBudgetOptions(promoData) {
      if (!isEmpty(promoData)) {
        this.budgetOptionsDisplay = this.getBudgetDisplayOptionsPromo(promoData)
        this.adData.budget = this.defaultPromoBudgetOption(promoData)
      } else {
        this.budgetOptionsDisplay = getBudgetDisplayOptions(this.budgetOptions)
        this.adData.budget = this.budgetOptions[1]
      }
      this.adData.budgetWithoutDiscount = this.budgetOptions[1]
      this.budgetOption = this.budgetOptionsDisplay[1]
    },

    getStartDateFormatted() {
      const today = new Date()
      return (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
    },

    resetData() {
      Store.agentPresenceOptions.selected = false
      Store.agentPresenceOptions.subOption = ''
      Store.adData.statusBadge = null
      Store.statusBadgeOptions.selectedColor = '#f5a623'
      Store.statusBadgeOptions.selectedMessage = 'Open House'
      Store.listingData.listingid = ''
      Store.listingData.location.address = ''
      Store.listingData.location.city = ''
      Store.listingData.location.state = ''
      Store.listingData.location.zip = ''
      Store.listingData.location.latitude = ''
      Store.listingData.location.longitude = ''
      Store.listingData.description = ''
      Store.officeData.address = ''
      Store.officeData.city = ''
      Store.officeData.state = ''
      Store.officeData.zip = ''
      Store.officeData.latitude = ''
      Store.officeData.longitude = ''
      Store.productType.name = ''
      Store.adData.headline = ''
      Store.adData.destinationUrl = ''
      Store.adData.destinationOption = ''
      Store.adData.description = ''
      Store.adData.location = ''
      Store.adData.imageUrl = ''
      Store.adData.budget = Store.budgetOptions[1]
      Store.adData.duration = Store.durationOptions[2].value
      Store.adData.selectedDuration = Store.durationOptions[2]
      Store.adData.expectedRangeMin = ''
      Store.adData.expectedRangeMax = ''
      Store.adData.distance = '50'
      Store.adData.ageMax = null
      Store.adData.locationOption = {}
      Store.adData.address = ''
      Store.adData.addressLine1 = ''
      Store.adData.addressLine2 = ''
      Store.adData.latitude = ''
      Store.adData.longitude = ''
      Store.adData.selectedCities = []
      Store.adData.status = ''
      Store.adData.start_date = ''
      Store.adData.agent_uuid = ''
      Store.adData.owner_uuid = ''
      Store.adData.company_uuid = ''
      Store.adData.listing_id = ''
      Store.adData.product_url = ''
      Store.adData.product_uuid = ''
      Store.adData.product_type = ''
      Store.adData.promoData = {}
      Store.adData.agentPresence = null
      Store.previousAdData.uuid = ''
      Store.listingData.main_image = ''
      Store.hasPhotoGallery = false
      Store.galleryUUID = ''
      Store.gallery_media = []
      Store.currentstep = 1
      Store.imageData = []
      Store.paymentSubmitted = false
      Store.bt_client_token = ''
      Store.payment_method_nonce = ''
      Store.amz_ref_id = ''
      Store.payment_sr = null
    }
  }
}
