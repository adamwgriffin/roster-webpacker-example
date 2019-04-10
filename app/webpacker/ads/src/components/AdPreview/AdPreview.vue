<template>
  <div id="fb-preview">
    <div class="mobile-preview-header">
      <a class="moxi-ads-close-btn" @click="toggleConPan('showPreviewConPan')">
        <i class="material-icons">keyboard_backspace</i>
      </a>
      Preview
    </div>
    <facebook-live-preview-logo></facebook-live-preview-logo>
    <facebook-news-feed-preview></facebook-news-feed-preview>
    <img
      class="fb-preview-footer"
      src="https://moxi3.ssl.hwcdn.net/img-pr/i/81ea860c6af18ea76c01decbab22d920ebd4e97a/0_2_raw.png"
    />
  </div>
</template>

<script>
  import Store from '../../data/store'
  import FacebookNewsFeedPreview from './FacebookNewsFeedPreview'
  import FacebookLivePreviewLogo from './FacebookLivePreviewLogo'
  import CommonHelpers from '../../mixins/helpers/common'
  import ConPanHelpers from '../../mixins/helpers/conpan'

  export default {
    mixins: [CommonHelpers, ConPanHelpers],

    components: {
      FacebookNewsFeedPreview,
      FacebookLivePreviewLogo
    },

    data() {
      return Store
    }
  }
</script>


<style lang="scss">
  .fb-preview-footer {
    display: block;
    margin: auto;
    background: top/cover no-repeat;
  }

  .fb-preview-footer {
    height: 435px;
    width: 387px;
  }

  .mobile-preview-header {
    display: flex;
    @media (min-width: 840px) { display: none; }
    align-items: center;
    height: 56px;
    background: #212e35;
    color: white;
    font-size: 20px;
    font-weight: 200;
    line-height: 100%;

    .material-icons { margin-right: 24px; }
  }

  @media (min-width: 481px) and (max-width: 840px) {
    #fb-preview {
      height: 100%;
    }
  }
</style>
