<template>
  <section class="more-info-2 ad-selection-container">
    <h1 class="more-info-heading">Client Expectations: <strong>Exceeded.</strong></h1>
    <div class="row">
      <div class="col s12 m4 center-align">
        <img
          class="more-info-img"
          src="https://moxi2.ssl.hwcdn.net/img-pr/i/2b88b64e04f7b5fde9fb5354de72b9eaa8231ad4/0_2_raw.png"
        >
      </div>
      <div class="col s12 m8">
        <h2 class="more-info-subheading">Hundreds of Thousands of People. Now within Your Reach.</h2>
        <p class="more-info-text">
          That's not a typo. Facebook has over 2 billion monthly users. Your clients
          want to know that you're a digital savvy agent who'll go above and beyond for
          them. Getting their listing in front of a massive Facebook audience will do
          just that.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m8">
        <h2 class="more-info-subheading">{{subheadingText}}</h2>
        <p v-if="isListingAd" class="more-info-text">
          Automated reports are sent directly to the client to show your efforts. Earn
          your client's praises, and in turn their referrals.
        </p>
        <p v-else class="more-info-text">
          Gain awareness, win agent referrals, and generate new leads. Quickly and easily build a Facebook ad and put
          your marketing on autopilot.
        </p>
      </div>
      <div class="col s12 m4">
        <img class="more-info-img" :src="moreInfoImageUrl">
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      isListingAd: Boolean
    },
    computed: {
      subheadingText() {
        return this.isListingAd ? 'Share your Results, Get more Business.' : 'Grow Your Business with Easy Farming.'
      },

      moreInfoImageUrl() {
        return this.isListingAd ?
          'https://moxi3.ssl.hwcdn.net/img-pr/i/1dbfe6c899fbdc07c96654ac51c7cc781c06bc43/0_2_raw.png' :
          'https://moxi3.ssl.hwcdn.net/img-pr/i/7c22c322ba9bfb30e1979e049bd2ae1c5f684898/0_2_raw.png'
      }
    }
  }
</script>


<style scoped lang="scss">
  .ad-selection-container {
    padding-bottom: 0;
  }

  .row:last-child {
    margin-bottom: 0;
  }

  .more-info-img {
    vertical-align: top;
    width: 100%;
    height: auto;
    max-width: 375px;
  }

  .more-info-heading {
    strong {
      font-weight: 700;
    }
  }

  .more-info-subheading {
    font-size: 30px;
    font-weight: 700;
    @media (min-width: 992px) { margin-top: 48px; }
  }
</style>
