<template>
  <section id="more-info" class="more-info-1 ad-selection-container">
    <p class="section-heading more-info-text">{{headingText}}</p>
    <div class="ayl-video">
      <div class="wistia_responsive_padding">
        <div class="wistia_responsive_wrapper">
          <div :class="wistiaEmbedClasses"></div>
        </div>
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
      headingText() {
        return `Learn about Promote Your ${this.isListingAd ? 'Listing' : 'Services'} in 20 seconds...`
      },

      wistiaEmbedClasses() {
        return [
          'wistia_embed',
          (this.isListingAd ? 'wistia_async_sbfq61zpwj' : 'wistia_async_624po6gdl4'),
          'videoFoam=true'
        ]
      },

      videoUrl() {
        return `https://fast.wistia.com/embed/medias/${this.isListingAd ? 'sbfq61zpwj' : 'sbfq61zpwj'}.jsonp`
      }
    },
    methods: {
      loadVideoJs(url, callback) {
        jQuery.ajax({
          url: url,
          dataType: 'script',
          success: callback,
          async: true
        })
      }
    },
    mounted() {
      this.loadVideoJs(this.videoUrl)
      this.loadVideoJs('https://fast.wistia.com/assets/external/E-v1.js')
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/colors";

  .more-info-1 {
    background: $super-light;
  }

  .section-heading {
    text-align: center;
    margin-top: 0;
  }

  .ayl-video {
    @media (min-width: 992px) {
      width: 66%;
    }
    margin: auto;
  }

  // these wistia styles were added as gross style attributes, moving into classes
  .wistia_responsive_padding {
    padding: 56.25% 0 0 0;
    position: relative;
  }

  .wistia_responsive_wrapper {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .wistia_embed {
    height: 100%;
    width: 100%
  }

  .ad-selection-container {
    padding-bottom: 48px;
  }
</style>
