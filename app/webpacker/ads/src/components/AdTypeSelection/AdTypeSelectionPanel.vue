<template>
  <section class="ad-type-selection-panel">
    <promo-header-brokerage
      v-if="showPromo"
      :header-style="promoStyle"
      :discount="promoData.discount_percentage"
      :sponsor="promotionSponsor"
    >
    </promo-header-brokerage>
    <div class="ad-selection-container ad-type-selection">
      <div class="choose-ad">
        <div class="row">
          <div class="col s12 center-align">
            <h1 class="selection-heading">Choose a Facebook Ad Type</h1>
          </div>
        </div>
        <div class="row selection-container">
          <div id="first-selection" class="selection-col col s12 m6 l6">
            <h2>News Feed Ad</h2>
            <img src="https://moxi2.ssl.hwcdn.net/img-pr/i/e9a1be608f737fa2075ee8f9b63b958eedb6b289/0_2_raw.png" />
            <p class="selection-text">Reach 3000+ people, no matter where they are</p>
            <cta-button ad-type="news-feed" label="Create News Feed Ad"></cta-button>
          </div>
          <div id="second-selection" class="selection-col col s12 m6 l6">
            <h2>Right Column Ad</h2>
            <img src="https://moxi1.ssl.hwcdn.net/img-pr/i/eec2960d6fb357b1769cad219e78798301865c77/0_2_raw.png" />
            <p class="selection-text">Reach 1000+ people</p>
            <cta-button ad-type="right-column" label="Create Right Column Ad"></cta-button>
          </div>
        </div>
      </div>
      <div class="more-info center-align hide-on-small-only">
        <span class="more-info-link" v-scroll-to="'#more-info'">
          <h1 class="selection-heading">How to Generate More Business</h1>
          <i class="more-info-icon material-icons">keyboard_arrow_down</i>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import VueScrollTo from 'vue-scrollto'
  import CtaButton from './CtaButton'
  import PromoHeaderBrokerage from './PromoHeaderBrokerage/PromoHeaderBrokerage'
  import Store from '../../data/store'

  Vue.use(VueScrollTo, {
    duration: 1000,
    easing: 'ease',
    cancelable: false,
    x: false,
    y: true
  })

  export default {
    components: {
      CtaButton,
      PromoHeaderBrokerage
    },

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
    },

    data() {
      return Store
    }
  }
</script>

<style scoped lang="scss">
  .ad-type-selection-panel {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      // topbar + moxi bar = 116
      height: calc(100vh - 116px);
    }
  }

  .ad-type-selection {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    @media (min-width: 992px) {
      padding-top: 72px;
    }
    padding-bottom: 0;
  }

  .selection-heading {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  .choose-ad {
    flex-grow: 1;
  }

  // this is a hack to keep the link visible on iOS Safari
  // because vh units do not work with calc() in that terrible browser
  @media (max-width: 992px) {
    &.more-info-link {
      margin-bottom: 30px;
    }
  }

  .more-info-link {
    display: inline-block;
    cursor: pointer;
  }

  .more-info-icon {
    font-size: 45px;
  }

  #selection-footer {
    text-align: center;
    margin-top: 16px;
  }

  .step-1-next {
    color: white;
  }

  #first-selection {
    @media(min-width: 1250px) { border-right: 1px solid #CCCCCC };
  }

  .selection-col {
    text-align: center;

    img {
      width: 100%;
      max-width: 389px;
    }

    h2 {
      font-size: 26px;
    }

    .selection-text {
      margin-top: 24px;
      margin-bottom: 36px;
    }

    button {
      margin-bottom: 36px;
    }
  }
</style>
