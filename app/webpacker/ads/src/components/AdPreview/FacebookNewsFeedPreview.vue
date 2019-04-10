<template>
  <div id="fb-preview-content">
    <div id="fb-preview-content-header">
      <div id="fb-preview-page-img">
        <img :src="adData.selectedBusiness['picture']">
      </div>
      <div id="fb-preview-page-name">
        <p>{{ adData.selectedBusiness['name'] }}</p>
        <div id="fb-preview-page-sponsored">
          <span>Sponsored - </span><img src="https://moxi3.ssl.hwcdn.net/img-pr/i/f0b587388a50c94e0dfe7ff0efde581e113f2d0f/0_2_raw.png"/>
        </div>
      </div>
      <div id="fb-preview-like-img">
        <!-- webpack url-loader loads this inline so it doesn't need to be hosted anywhere -->
        <img src="../../assets/facebook-like.svg">
      </div>
    </div>
    <p id="fb-preview-content-desc">{{ shortDescription }}</p>
    <div id="fb-preview-content-img" v-bind:style="{ backgroundImage: `url(${adData.imageUrl})` }">
      <status-badge-facebook-preview
        v-if="adData.statusBadge"
        :background-color="adData.statusBadge.backgroundColor"
        :message="adData.statusBadge.text"
      >
      </status-badge-facebook-preview>
      <agent-presence-preview
        v-if="adData.agentPresence"
        :name="adData.agentPresence.name"
        :photo="adData.agentPresence.thumbnail"
        :team="adData.agentPresence.team"
      ></agent-presence-preview>
    </div>
    <div id="fb-preview-content-body">
      <!-- Changes emitted from <editable-dropdown> update the model here -->
      <p id="fb-preview-content-title">{{ adData.headline || '&nbsp;' }}</p>
      <p id="fb-preview-content-location">{{ adData.location || '&nbsp;' }}</p>
      <p id="fb-preview-content-link">{{ adData.displayUrl }}</p>
    </div>
  </div>
</template>

<script>
  import Store from '../../data/store'
  import AgentPresencePreview from '../AgentPresence/AgentPresencePreview.vue'
  import StatusBadgeFacebookPreview from '../StatusBadge/StatusBadgeFacebookPreview'

  export default {
    components: { AgentPresencePreview, StatusBadgeFacebookPreview },

    data() {
      return Store
    },

    computed: {
      shortDescription() {
        if (Store.adData.description.length > 90) {
          return `${Store.adData.description.substring(0, 87)}...`
        } else {
          return Store.adData.description
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../scss/fonts";

  #fb-preview-content {
    display: block;
    width: 347px;
    margin: 0 auto;
    border: 1px solid #E8E8E8;
    border-radius: 3px;
    padding: 10px;
    background: #FFFFFF;
    font-family: $helvetica-font-stack;
  }

  #fb-preview-content p {
    margin: 0;
  }

  #fb-preview-content-header {
    display: flex;
  }

  #fb-preview-page-img img {
    height: 40px;
    width: 40px;
    border: 1px solid #E8E8E8;
  }

  #fb-preview-page-name p {
    font-weight: bold;
    font-size: 14px;
    color: #1A202F;
    margin-left: 14px;
  }

  #fb-preview-page-name span {
    font-weight: normal;
    font-size: 12px;
    color: #A2A8B2;
    margin-left: 14px;
  }

  #fb-preview-page-sponsored {
    display: flex;
    align-items: center;
  }

  #fb-preview-page-sponsored img{
    width: 9px;
    height: 9px;
    margin-left: 2px;
  }

  #fb-preview-like-img {
    flex-grow: 1;
    text-align: right;
  }

  #fb-preview-like-img img {
    width: 22px;
    height: 22px;
    margin-top: 9px;
  }

  #fb-preview-content-desc {
    word-wrap: break-word;
    font-weight: normal;
    font-size: 14px;
    color: #1A202F;
    padding-bottom: 9px;
    padding-top: 6px;
  }

  #fb-preview-content-body {
    border: 1px solid #E8E8E8;
    padding-left: 11px;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  #fb-preview-content-title {
    font-weight: bold;
    font-size: 14px;
    color: #1A202F;
  }

  #fb-preview-content-location {
    font-weight: normal;
    font-size: 12px;
    color: #1A202F;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  #fb-preview-content-link {
    font-weight: normal;
    font-size: 12px;
    color: #A2A8B2;
    word-wrap: break-word;
  }

  #fb-preview-content-img {
    position: relative;
    width: 325px;
    height: 164px;
    display: block;
    margin: auto;
    background: center/cover no-repeat;
  }
</style>
