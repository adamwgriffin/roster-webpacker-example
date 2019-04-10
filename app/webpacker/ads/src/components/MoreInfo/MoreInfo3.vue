<template>
  <section class="more-info-3 ad-selection-container">
    <div class="row">
      <div class="col s12">
        <h1 class="more-info-heading">How It Works</h1>
        <p class="more-info-text">{{moreInfoText}}</p>
      </div>
      <div class="col s12 m12 l6 center-align">
        <img class="steps-animation responsive-img" :src="adStepsImage">
        <p class="steps-animation-caption">
          Create an ad in 3 quick steps all within Moxi Works
        </p>
      </div>
      <div class="col s12 m12 l6">
        <ol class="more-info-list">
          <li>
            <div class="list-heading">Customize Your Ad</div>
            <ul class="more-info-sublist more-info-text">
              <li>Choose from a selection of attention grabbing copy...or create your own</li>
              <li>Add your own Facebook Business Page logo</li>
              <li v-if="isListingAd">Select images from the MLS</li>
              <li v-else>Upload an image</li>
            </ul>
          </li>
          <li>
            <div class="list-heading">Set Your Budget</div>
            <ul class="more-info-sublist more-info-text">
              <li>Set a maximum budget and we won't go over it</li>
              <li>See how many people you can reach in real-time</li>
            </ul>
          </li>
          <li>
            <div class="list-heading">Target the Right People</div>
            <ul class="more-info-sublist more-info-text">
              <li>You decide what type of people you want seeing this ad. You can customize on Age and Location</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m6 right-align cta-button-col">
        <cta-button ad-type="news-feed" label="Create News Feed Ad"></cta-button>
      </div>
      <div class="col s12 m6 cta-button-col">
        <cta-button ad-type="right-column" label="Create Right Column Ad"></cta-button>
      </div>
    </div>
  </section>
</template>

<script>
  import CtaButton from '../AdTypeSelection/CtaButton'
  import { ROSTER_SERVICE_BASE } from '../../constants/env'

  export default {
    props: {
      isListingAd: Boolean
    },

    components: {
      CtaButton
    },

    computed: {
      adStepsImage() {
        return `${ROSTER_SERVICE_BASE}/images/ad_steps.gif`
      },

      moreInfoText() {
        const [serviceName, serviceType] = this.isListingAd ? ['Listing', 'listings'] : ['Services', 'services']
        return `Whether you're new to advertising on Facebook or a pro, Promote Your ${serviceName}
          gives you the tools to promote your ${serviceType} in under 5 minutes.`
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/colors";

  .more-info-3 {
    background: $super-light;
  }

  .steps-animation-caption {
    font-size: 16px;
    margin-top: 10px;
  }

  .more-info-list > li {
    font-size: 20px;
    font-weight: 700;
  }

  .more-info-sublist {
    margin: 8px 0 20px 0;

    & > li {
      list-style-type: disc;
      font-weight: normal;
    }
  }

  .cta-button-col {
    padding: 48px 20px;
    @media (max-width: 600px) {
      padding: 16px;
      text-align: center;
    }
  }
</style>
