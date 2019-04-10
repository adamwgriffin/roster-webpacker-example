<template>
  <section>

    <div id="topbar">
      <a class="material-icons moxi-ads-close moxi-ads-close-btn" href="#" @click="closeModal">clear</a>
      <div id="topbar-header">
        <span>Promote Your Services</span>
      </div>
    </div>

    <promo-header
      v-if="showPromo"
      :header-style="promoStyle"
      :discount="promoData.discount_percentage"
      :sponsor="promotionSponsor"
    ></promo-header>

    <div class="step-number-header">
      Step {{ currentstep }} of 3
    </div>

    <div id="content">
      <loading-spinner :show="dataLoading"></loading-spinner>

      <navigation-sidebar :steps="steps" :currentstep="currentstep"></navigation-sidebar>

      <div id="step-content" v-if="currentstep === 1">
        <first-step></first-step>
      </div>

      <div id="step-content" v-if="currentstep === 2">
        <second-step></second-step>
      </div>

      <div id="payment-content" v-if="currentstep === 3">
        <third-step></third-step>
      </div>

      <div id="preview-bar" v-if="currentstep === 1" :class="animateConPan('showPreviewConPan')">
        <ad-preview></ad-preview>
      </div>

      <div id="preview-bar" v-if="currentstep === 2" :class="animateConPan('showReachConPan')">
        <expected-range-preview></expected-range-preview>
      </div>

    </div>
  </section>
</template>

<script>
  import Initialize from '../mixins/initialize'
  import ConPanHelpers from '../mixins/helpers/conpan'
  import AddressHelpers from '../mixins/helpers/address'
  import AylAysHelpers from '../mixins/helpers/ayl_ays'
  import { getImageUrl } from '../lib/image'
  import Ad from '../service/ad'
  import Marketing from '../service/marketing'
  import Facebook from '../service/facebook'
  import Profile from '../service/profile'
  import Image from '../service/image'
  import Store from '../data/store'
  import { aysFreebies } from '../data/images'
  import * as Env from '../constants/env'
  import uuid from 'uuid/v4'
  import LoadingSpinner from './LoadingSpinner'
  import NavigationSidebar from './NavigationSidebar'
  import FirstStep from './FirstStep'
  import SecondStep from './SecondStep'
  import ThirdStep from './ThirdStep'
  import AdPreview from './AdPreview/AdPreview'
  import ExpectedRangePreview from './ExpectedRangeEstimatePreview'

  export default {
    name: 'advertise-your-services',
    components: {
      LoadingSpinner,
      NavigationSidebar,
      FirstStep,
      SecondStep,
      ThirdStep,
      AdPreview,
      ExpectedRangePreview
    },
    data() {
      return Store
    },
    mixins: [Initialize, AylAysHelpers, AddressHelpers, ConPanHelpers],
    methods: {
      async initAdData() {
        this.dataLoading = true

        try {
          await this.initializeApp()
        } catch (error) {
          console.error('Moxi Ads initialze app fetch error', error)
        }

        // Populate headline & location targeting options
        Store.headlineOptions = Store.aysHeadlineOptions
        Store.locationOptions = Store.aysLocationOptions

        // Populate Products
        Store.products = Store.productInfo.AYS.products
        this.adData.product_uuid = this.products[this.adData.adType]

        // Populate freebie image data
        Store.imageData = aysFreebies

        try {
          await Facebook.getPageOptions()
        } catch (error) {
          console.error('Moxi Ads Page Options fetch error', error)
        }

        try {
          await Ad.populateDestinationOptions()
        } catch (error) {
          console.error('Moxi Ads Destination Options fetch error', error)
        }

        try {
          await Profile.getOfficeData()
        } catch (error) {
          console.error('Moxi Ads Office fetch error', error)
        }

        /* this possibly was never working right before I refactored it because we weren't actually importing the Image
        module, it looks like we were never showing all the images that had previously been uploaded for a listing ad,
        only the ones that had actually been used as the image for an ad that was purchased */
        try {
          await Image.populateUploadedImages()
        } catch (error) {
          console.error('Moxi Ads Uploaded images fetch error', error)
        }

        try {
          await Image.populatePreviousImages()
        } catch (error) {
          console.error('Moxi Ads Previous images fetch error', error)
        }

        if (Store.previousAdData.uuid) {
          try {
            await Ad.getPreviousAd()
          } catch (error) {
            console.error('Moxi Ads Previous ad fetch error', error)
          }
          Store.adData.uuid = uuid()
          this.dataLoading = false
          Marketing.trackFeatureUsage(['start'])
        } else {
          Store.adData.uuid = uuid()
          Store.adData.headline = Store.aysHeadlineOptions[0]
          if (Store.destinationOptions.length > 0) {
            Store.destinationOption = Store.destinationOptions[0]
            Store.adData.destinationUrl = Store.destinationOption.value
          }
          if (Store.adData.destinationUrl) {
            Store.adData.displayUrl = this.getDisplayUrl(Store.adData.destinationUrl)
          }
          Store.adData.imageUrl = getImageUrl(Store.imageData)
          Store.adData.duration = Store.durationOptions[2].value
          Store.adData.selectedDuration = Store.durationOptions[2]
          Store.adData.locationOption = Store.locationOptions[0]
          const { address, city, state, zip } = Store.officeData
          Store.adData.address = this.joinFullAddress(address, city, state, zip)
          Store.adData.addressLine1 = address
          Store.adData.addressLine2 = this.joinCityStateZip(city, state, zip)
          Store.adData.latitude = Store.officeData.latitude
          Store.adData.longitude = Store.officeData.longitude
          Store.adData.start_date = this.getStartDateFormatted()
          Store.adData.agent_uuid = Env.AGENT_UUID
          Store.adData.owner_uuid = Env.AGENT_UUID
          Store.adData.company_uuid = Env.COMPANY_UUID
          Store.adData.product_type = Store.productType.name
          Store.adData.product_url = `${Env.ROSTER_SERVICE_BASE}/profile/${Env.AGENT_UUID}/ads`
          this.dataLoading = false
          Marketing.trackFeatureUsage(['start', Store.listingData.listingid])
        }
      }
    },
    computed: {
      productTypeName() {
        return this.productType.name
      }
    },
    watch: {
      productTypeName() {
        this.initAdData()
      }
    },
    mounted() {
      this.initAdData()
    }
  }
</script>
