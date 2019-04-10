import Store from '../data/store'
import { ROSTER_SERVICE_BASE, AGENT_UUID } from '../constants/env'

export default {
  getBraintreeToken() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${ROSTER_SERVICE_BASE}/v1/payments/new`,
        dataType: 'jsonp'
      })
        .done(function(res) {
          if (res.status === 'success') {
            Store.bt_client_token = res.client_token
            resolve(res)
          } else {
            reject(new Error('Fetching payment token failed'))
          }
        })
        .fail(function() {
          reject(new Error('Fetching payment token failed'))
        })
    })
  },

  getAdDuration() {
    // Remove pluralization of ad duration name for confirmation email
    return Store.adData.selectedDuration.label.slice(-1)[0] === 's'
      ? Store.adData.selectedDuration.label.slice(0, -1)
      : Store.adData.selectedDuration.label
  },

  convertDollarsToCents(dollars) {
    return Math.round(parseFloat(dollars) * 100)
  },

  discountAmount() {
    return this.convertDollarsToCents(Store.adData.budgetWithoutDiscount) - this.convertDollarsToCents(Store.adData.budget)
  },

  getPaymentData() {
    return {
      promo_data: Store.adData.promoData,
      payment: {
        amount: this.convertDollarsToCents(Store.adData.budget),
        discount_amount: this.discountAmount(),
        product_uuid: Store.adData.product_uuid,
        product_details: {
          ad_duration: this.getAdDuration(),
          listing_id: Store.listingData.listingid,
          ad_uuid: Store.adData.uuid,
          listing_url: `${ROSTER_SERVICE_BASE}/listings/${AGENT_UUID}/edit/${Store.listingData.listingid}?viewonly=1`,
          listing_address: Store.adData.addressLine1,
          ad_preview_url: Store.adData.previewUrl,
          product_url: Store.adData.product_url
        },
        device_data: Store.bt_device_data,
        payment_method_nonce: Store.payment_method_nonce,
        amz_ref_id: Store.amz_ref_id,
        provider: Store.payment_provider
      }
    }
  },

  createPayment() {
    return new Promise((resolve, reject) => {
      $.post(`${ROSTER_SERVICE_BASE}/v1/payments?agent_id=${AGENT_UUID}`, this.getPaymentData(), (res) => {
        if (res.status === 'success') {
          Store.payment_sr = res.data[0].payment_sr
          resolve(res)
        } else {
          reject(res)
        }
      })
        .fail((xhr) => {
          reject(xhr.responseJSON)
        })
    })
  }

}
