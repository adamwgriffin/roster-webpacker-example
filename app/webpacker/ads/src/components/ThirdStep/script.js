import * as braintree from 'braintree-web'
import 'custom-event-polyfill'
import pick from 'lodash-es/pick'
import uuid from 'uuid/v4'
import Store from '../../data/store'
import FacebookNewsFeedPreview from '../AdPreview/FacebookNewsFeedPreview'
import TermsOfService from '../TermsOfService'
import ProductDetails from '../ProductDetails'
import Payment from '../../service/payment'
import Ad from '../../service/ad'
import Marketing from '../../service/marketing'
import * as Env from '../../constants/env'
import AddressHelpers from '../../mixins/helpers/address'
import NavigationHelpers from '../../mixins/helpers/navigation'
import CommonHelpers from '../../mixins/helpers/common'
import { returnImageDimensionsAndUrl } from '../../lib/image'
import { removePromotion } from '../../mixins/initialize.js'

export default {
  data() {
    return Store
  },
  mixins: [CommonHelpers, AddressHelpers, NavigationHelpers],
  mounted() {
    this.trackFeatureUsage('checkout')
    // this.initializeAmazonButton()
    this.refreshBraintreeToken()
  },
  components: {
    FacebookNewsFeedPreview,
    TermsOfService,
    ProductDetails
  },
  computed: {
    orderInvalid() {
      return !this.tosAccepted || this.paymentSubmitted
    },

    reportsUrl() {
      return `${this.adData.product_url}?my_ads=true`
    },

    myAdsUrl() {
      return `${Env.ROSTER_SERVICE_BASE}/profile/${Env.AGENT_UUID}/ads?my_ads=true`
    },

    calculatedBaseBudget() {
      const promoReversePercent = ((100.0 - Number(this.promoData.discount_percentage)) / 100.0)
      return (Number(this.adData.budget) / promoReversePercent).toFixed(2)
    },

    invokePromo() {
      return (this.budgetOption.indexOf('data-budget-sale-value') > -1)
    },

    // roster listens for click event on .moxi-ads-close, and will close the ads app if the event occurs
    closeAdsAppClass() {
      return !['payment', 'promo'].includes(this.errorModalType) && ['moxi-ads-close']
    }
  },
  methods: {
    trackFeatureUsage(type) {
      const usageArray = [type]
      if (this.productType.name === 'listing') usageArray.push(this.listingData.listingid)
      Marketing.trackFeatureUsage(usageArray)
    },

    checkPayment() {
      this.trackFeatureUsage('purchasebutton')
      // Don't submit the payment if it's Braintee.
      // Braintree has its own hook onPaymentMethodReceived to submit the payment
      if (this.payment_provider !== 'braintree') {
        // Clear out any stored braintree key
        this.payment_method_nonce = ''
        this.submitPayment()
      }
    },

    setBraintreePayment(obj) {
      if (this.payment_provider === 'braintree') {
        // Clear out stored amazon key
        this.amz_ref_id = ''
        this.payment_method_nonce = obj.nonce
        this.submitPayment()
      }
    },

    setImageDimensionsAndUrl() {
      return new Promise(async (resolve, reject) => {
        try {
          const dimensionsAndUrl = await returnImageDimensionsAndUrl(this.adData.imageUrl)
          this.adData.imageUrl = dimensionsAndUrl.imageUrl
          this.adData.imageDimensions = pick(dimensionsAndUrl, ['width', 'height'])
          resolve(dimensionsAndUrl)
        } catch (error) {
          return reject(error)
        }
      })
    },

    async submitPayment() {
      // Prevent submitting multiple orders
      if (!this.paymentSubmitted) {
        this.paymentSubmitted = true
        this.dataLoading = true

        /* this seems to be for generating a preview for reporting. it doesn't seem critical at all, so we won't bail
        if something goes wrong with it. */
        Ad.createPreviewImage()

        /* we don't really need image dimensions anymore, so no big deal if this fails. however the logic this employs
        to get the raw image url if the image size is too small seems useful so keeping it here. */
        this.setImageDimensionsAndUrl()

        try {
          await Ad.createAd()
        } catch (error) {
          this.adPurchaseError( error.promo_unavailable ? 'promo' : '' )
          return
        }

        try {
          await Payment.createPayment()
        } catch (error) {
          this.adPurchaseError( error.promo_unavailable ? 'promo' : 'payment' )
          return
        }

        try {
          await Ad.activateAd()
          this.adPurchaseSuccess()
        } catch (error) {
          this.adPurchaseError('activation')
          return
        }
      }
      this.dataLoading = false
    },

    setModalErrorMessage(errorType='') {
      this.errorModalType = errorType
      switch (errorType) {
        case 'promo':
          this.errorModalHeader = this.promoErrorHeader
          this.errorModalBody = this.promoErrorBody
          break
        case 'payment':
          this.errorModalHeader = this.paymentErrorHeader
          this.errorModalBody = this.paymentErrorBody
          break
        case 'activation':
          this.errorModalHeader = this.activateErrorHeader
          this.errorModalBody = this.activateErrorBody
          break
        default:
          this.errorModalHeader = this.createAdErrorHeader
          this.errorModalBody = this.createAdErrorBody
      }
    },

    adPurchaseError(errorType='') {
      this.setModalErrorMessage(errorType)
      switch (errorType) {
        case 'promo':
          /* on the initial attempt, an advertise_your_stuff record will created with the current adData.uuid, if we had
          an error for payments, which happen after ad creation. unless we set a new uuid, the previous record will be
          updated, instead of a new record being created. this will cause the promo data from the first attempt to be
          included with the ad, even though the promo is not available at this point. setting a new uuid is the simplest
          solution to avoid this. */
          this.adData.uuid = uuid()
          removePromotion()
          break
        default:
          this.trackFeatureUsage('fail')
      }
      this.dataLoading = false
      $('#purchase-error-modal').openModal()
      $('#payment-submit-btn').prop('disabled', false)
    },

    adPurchaseSuccess() {
      document.dispatchEvent(
        new CustomEvent('moxi-ads:created', { detail: { listingid: this.listingData.listingid } })
      )
      $('#purchase-confirmation-modal').openModal()
      this.trackFeatureUsage('success')
      $('#payment-submit-btn').prop('disabled', true)
    },

    purchaseErrorModalClose() {
      $('#purchase-error-modal').closeModal()
      if (this.bt_checkout) {
        this.bt_checkout.teardown(function() {
          this.bt_checkout = null
        })
      }
      this.paymentSubmitted = false
      this.refreshBraintreeToken()
    },

    promoErrorModalClose() {
      $('#purchase-error-modal').closeModal()
      this.paymentSubmitted = false
    },

    closeAppAndReset() {
      document.dispatchEvent( new CustomEvent('moxi-ads:closed') )
      this.$parent.$options.methods.resetData()
    },

    closeModal() {
      switch (this.errorModalType) {
        case 'payment':
          this.purchaseErrorModalClose()
          break
        case 'promo':
          this.promoErrorModalClose()
          break
        default:
          this.closeAppAndReset()
      }
    },

    braintreeToggle() {
      this.refreshPaymentContent('braintree')
    },

    amazonToggle() {
      this.refreshPaymentContent('amazon')
    },

    refreshBraintreePaymentContent() {
      let self = this
      braintree.setup(Store.bt_client_token, 'dropin', {
        container: 'payment-selection-content',
        onPaymentMethodReceived: self.setBraintreePayment,
        dataCollector: {
          kount: {
            environment: (Env.ENVIRONMENT === 'production' ? 'production' : 'sandbox')
          }
        },
        onReady: function(integration) {
          Store.bt_checkout = integration
          Store.bt_device_data = integration.deviceData
        }
      })
    },

    refreshAmazonPaymentContent() {
      new OffAmazonPayments.Widgets.Wallet({
        sellerId: 'A3VLNWNDB56QBE',
        onOrderReferenceCreate: function(orderReference) {
          /* ENG-99449 - be careful about using this.amz_ref_id here instead of Store.amz_ref_id. the context of the
          this keyword changes in the callback so it no longer points to the store. it can cause a
          InvalidOrderReferenceId error from Amazon because amz_ref_id doesn't get the value assigned */
          Store.amz_ref_id = orderReference.getAmazonOrderReferenceId()
        },
        onPaymentSelect: function() {
        },
        design: {
          designMode: 'responsive'
        },
        onError: function(error) {
          console.log(error)
        }
      }).bind('payment-selection-content')
    },

    refreshPaymentContent(provider) {
      $('#payment-selection-content').empty()
      this.payment_provider = provider
      switch (provider) {
        case 'braintree':
          this.refreshBraintreePaymentContent()
          break;
        case 'amazon':
          this.refreshAmazonPaymentContent()
          break;
        default:
          console.error(`Payment provider ${provider} not recognized for refreshPaymentContent`)
      }
    },

    async refreshBraintreeToken() {
      this.dataLoading = true
      try {
        await Payment.getBraintreeToken()
        this.refreshPaymentContent(this.payment_provider)
        this.dataLoading = false
      } catch (error) {
        console.error('Moxi Ads Braintree token fetch failed', error)
      }
    },

    initializeAmazonButton() {
      amazon.Login.setClientId('amzn1.application-oa2-client.540ffbffb9a645c49a692d7b0cb2470e')
      OffAmazonPayments.Button('AmazonPayButton', 'A3VLNWNDB56QBE', {
        type: 'PwA',
        color: 'LightGray',
        authorization: function() {
          amazon.Login.authorize(
            { scope: 'profile postal_code payments:widget', popup: true },
            function() {
              $('#walletWidgetDiv').show()
            }
          )
        },
        onError: function(error) {
          console.log(error)
        }
      })
    }

  }
}
