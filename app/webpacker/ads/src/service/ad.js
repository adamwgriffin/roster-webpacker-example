import isEmpty from 'lodash-es/isEmpty'
import Store from '../data/store'
import * as Env from '../constants/env'

export default {
  /* don't return promoData at all if the promotion doesn't exist, or does not apply to the price point chosen for the ad */
  adDataFilterPromo() {
    if ( !isEmpty(Store.adData.promoData) &&
      Store.adData.promoData.price_points.includes(Number(Store.adData.budgetWithoutDiscount)) ) {
      return Store.adData
    } else {
      const { promoData, ...adDataWithoutPromoData } = Store.adData
      return adDataWithoutPromoData
    }
  },

  createAd() {
    return new Promise((resolve, reject) => {
      $.post(`${Env.ROSTER_SERVICE_BASE}/moxi_ads/api/v1/create_ad/`, { ad_data: this.adDataFilterPromo() })
        .done((res) => resolve(res))
        .fail((xhr) => reject(xhr.responseJSON))
    })
  },

  activateAd() {
    return new Promise((resolve, reject) => {
      const activateData = Store.payment_sr ? { 'payment_sr': Store.payment_sr } : {}
      $.ajax({
        url: `${Env.ROSTER_SERVICE_BASE}/moxi_ads/api/v1/activate_ad/${Store.adData.uuid}`,
        data: activateData
      })
        .done((res) => resolve(res))
        .fail((xhr) => reject(xhr.responseJSON))
    })
  },

  getPreviousAd() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${Env.ROSTER_SERVICE_BASE}/moxi_ads/api/v1/ad/${Store.previousAdData.uuid}`,
        dataType: 'jsonp',
        success: function(res) {
          if (res.status === 'failure') return reject(new Error('Fetch ad failed'))
          Store.adData.headline = res.ad_data.headline
          Store.adData.description = res.ad_data.description
          Store.adData.destinationUrl = res.ad_data.destinationUrl
          // Set the correct destinationOption input if they are used
          if (Store.destinationOptions.length > 0) {
            // If the destination URL was default agent page set that option
            // otherwise set the destination option to the custom one
            if (Store.adData.destinationUrl === Store.destinationOptions[0].value) {
              Store.destinationOption = Store.destinationOptions[0]
            } else {
              Store.destinationOption = Store.destinationOptions[1]
            }
          }
          if (Store.adData.destinationUrl) {
            let parser = document.createElement('a')
            parser.href = Store.adData.destinationUrl
            Store.adData.displayUrl = parser.hostname
          }
          Store.adData.location = res.ad_data.location || `${Store.listingData.location.city}, ${Store.listingData.location.state}`
          Store.adData.imageUrl = res.ad_data.imageUrl
          // Add the previously used image to the imageData options if it isn't there
          const previousImage = Store.imageData.find(image => image.full_url === Store.adData.imageUrl)
          if (isEmpty(previousImage)) {
            Store.imageData = Store.imageData.concat([
              {
                full_url: Store.adData.imageUrl,
                selected: true
              }
            ])
          }

          // Select previous image
          for (let img of Store.imageData) { img.selected = img.full_url === Store.adData.imageUrl }

          // TODO: refactor to eliminate baseBudget. It seems to not be necessary anymore
          // just using budgetWithoutDiscount is a lot less complicated & confusing
          if (res.ad_data.budgetWithoutDiscount) {
            Store.adData.budgetWithoutDiscount = res.ad_data.budgetWithoutDiscount
          }

          // set baseBudget to the previous budget, in case there wasn't a promotion before but there is one avilable now
          let baseBudget = res.ad_data.budget
          // Check if there was previously set promo data
          // If there was calculate the base budget
          if (!isEmpty(res.ad_data.promoData)) {
            // budgetWithoutDiscount is a new property that was added later which makes in uncessesary to figure out
            // what the budget would have been without the discount. we're keeping the original code for legacy purposes
            if (res.ad_data.budgetWithoutDiscount) {
              baseBudget = res.ad_data.budgetWithoutDiscount
            } else {
              // promoPercent is what discount_percentage used to be called
              const promoReversePercent = ((100.0 - Number(res.ad_data.promoData.promoPercent)) / 100.0)
              baseBudget = (Number(res.ad_data.budget) / promoReversePercent).toFixed(2)
            }
          }

          // console.log('getPreviousAd(), before assignment to budge: ', Store.adData.budget)
          // If there is an new promotion available now, then apply it to the base budget and set the budget
          // We also need to check the price_points array to make absolutely sure the selected budget price is part of the promotion.
          if (!isEmpty(Store.promoData) && !isEmpty(Store.promoData.price_points) && Store.promoData.price_points.indexOf(baseBudget.to_i) > -1) {
            Store.adData.budget = (baseBudget * (100.0 - Number(Store.promoData.discount_percentage)) / 100.0).toFixed(2)
          } else {
            Store.adData.budget = baseBudget
          }
          // console.log('getPreviousAd(), after assignment: ', Store.adData.budget)

          // Determine which budget dropdown to select
          for (let index = 0; index < Store.budgetOptionsDisplay.length; ++index) {
            let budgetSelection = $($.parseHTML(Store.budgetOptionsDisplay[index]))
            if (budgetSelection.data('budget-value') === baseBudget) {
              Store.budgetOption = Store.budgetOptionsDisplay[index]
            }
          }

          Store.adData.locationOption = Store.locationOptions[0]
          for (let index = 0; index < Store.locationOptions.length; ++index) {
            if (Store.adData.locationOption.value === Store.locationOptions[index].value) {
              Store.adData.locationOption = Store.locationOptions[index]
            }
          }
          Store.adData.duration = res.ad_data.duration
          Store.adData.selectedDuration = res.ad_data.selectedDuration
          Store.adData.distance = res.ad_data.distance
          Store.adData.ageMax = res.ad_data.ageMax
          Store.adData.address = res.ad_data.address
          Store.adData.addressLine1 = res.ad_data.addressLine1
          Store.adData.addressLine2 = res.ad_data.addressLine2
          Store.adData.latitude = res.ad_data.latitude
          Store.adData.longitude = res.ad_data.longitude
          if (res.ad_data.selectedCities && typeof res.ad_data.selectedCities === 'object') {
            Store.adData.selectedCities = Object.values(res.ad_data.selectedCities)
          }
          Store.adData.status = 'pending'
          let today = new Date()
          Store.adData.start_date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
          Store.adData.agent_uuid = res.ad_data.agent_uuid
          Store.adData.owner_uuid = res.ad_data.owner_uuid
          Store.adData.company_uuid = res.ad_data.owner_uuid
          Store.adData.listing_id = res.ad_data.listing_id
          Store.adData.company_uuid = res.ad_data.company_uuid
          Store.adData.product_url = res.ad_data.product_url
          Store.adData.product_type = res.ad_data.ays_type
          if (res.ad_data.agentPresence) {
            Store.adData.agentPresence = res.ad_data.agentPresence
            Store.adData.agentPresence.team = res.ad_data.agentPresence.team === 'true'
            Store.agentPresenceOptions.selected = true
            Store.agentPresenceOptions.subOption = res.ad_data.agentPresence.subOption
          }
          if (res.ad_data.statusBadge) {
            Store.adData.statusBadge = res.ad_data.statusBadge
            Store.statusBadgeOptions.selectedColor = res.ad_data.statusBadge.backgroundColor
            Store.statusBadgeOptions.selectedMessage = res.ad_data.statusBadge.text
          }
          resolve(res)
        },
        error: function() {
          reject(new Error('Fetch ad failed'))
        }
      })
    })
  },

  createPreviewImage() {
    return new Promise((resolve, reject) => {
      $.post(`${Env.ROSTER_SERVICE_BASE}/moxi_ads/api/v1/facebook_preview`, { ad_data: Store.adData })
        .done(function(res) {
          if (res.data.length) Store.adData.previewUrl = res.data[0].preview_url
        })
        .always(function(res) {
          return resolve(res)
        })
    })
  },

  populateDestinationOptions() {
    if (Env.AGENT_DOMAIN) {
      let destinationLabel = ''
      let destinationDescription = ''
      let destinationUrl = ''
      if (Store.productType.name === 'listing') {
        Store.listingData.details_url = `${Env.AGENT_DOMAIN}/listing/${Store.listingData.listingid}`
        destinationUrl = Store.listingData.details_url
        switch (Env.AGENT_SITE_TYPE) {
          case 'brokerage':
            destinationLabel = 'Listing Page - Brokerage Website'
            destinationDescription = 'Listing details page on your Brokerage Website'
            break
          case 'office':
            destinationLabel = 'Listing Page - Office Website'
            destinationDescription = 'Listing details page on your Office Website'
            break
          case 'agent team':
            destinationLabel = 'Listing Page - Agent Team Website'
            destinationDescription = 'Listing details page on your Agent Team Website'
            break
          case 'agent':
            destinationLabel = 'Listing Page - Agent Website'
            destinationDescription = 'Listing details page on your Agent Website'
            break
          default:
            destinationLabel = 'Listing Page - Agent Website'
            destinationDescription = 'Listing details page on your Agent Website'
        }
      } else {
        destinationLabel = 'Your Agent Website'
        destinationUrl = Env.AGENT_DOMAIN
      }
      Store.destinationOptions = [
        {
          'label': destinationLabel,
          'description': destinationDescription,
          'value': destinationUrl
        },
        {
          'label': 'Custom',
          'description': 'Want to use another page? Enter the URL',
          'value': ''
        }
      ]
    } else if (Env.ACOM_DOMAIN && (Store.listingData.owner_uuid === Env.AGENT_UUID)) {
      Store.listingData.details_url = `${Env.ACOM_DOMAIN}/facebookad?listingid=${Store.listingData.listingid}&agent_uuid=${Env.AGENT_UUID}`
      Store.destinationOptions = [
        {
          'label': 'Exclusive Listing Page',
          'description': 'Your very own web page specific for this listing',
          'value': `${Env.ACOM_DOMAIN}/facebookad?listingid=${Store.listingData.listingid}&agent_uuid=${Env.AGENT_UUID}`
        },
        {
          'label': 'Custom',
          'description': 'Already have a listing page? Enter the URL',
          'value': ''
        }
      ]
    }
  }
}
