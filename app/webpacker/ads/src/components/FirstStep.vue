<template>
  <section>

    <div class="row">
      <div class="col s12">
        <h4 class="ayl-heading">Create an Attention Grabbing Ad</h4>
      </div>
    </div>

    <description-field></description-field>
    <headline-field></headline-field>
    <!-- this component is called "additional text" but it is the Location field for listing ads and it is only
    additional text for services ads -->
    <additional-text-field></additional-text-field>
    <destination-page :valid-destination-url="validDestinationUrl"></destination-page>

    <div class="row ad-image-container">
      <div class="col s12 m7 l6">
        <image-selection></image-selection>
      </div>
      <div class="col s12 m12 l5 offset-l1">
        <business-dropdown
          id="ad-business-input"
          class="business-input"
          v-model="adData.selectedBusiness"
          tooltip="The Business Page you choose will be represented in your ad."
          :on-change="updateBusiness"
          :options="businessOptions"
          :editable="false"
        ></business-dropdown>
      </div>
    </div>

    <agent-presence-options></agent-presence-options>
      
    <status-badge-options v-if="isListingAd"></status-badge-options>

    <div class="row">
      <div id="mobile-preview-btn" class="col s12 m12 input-field">
        <button class="full-width-mobile-btn waves-effect" @click="toggleConPan('showPreviewConPan')">
          Preview Ad
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col s6 m6 input-field">
        <button
          type="submit"
          class="btn btn-back white btn-no-shadow waves-effect waves-light"
          @click="backStep()"
        >
          Back
        </button>
      </div>
      <div class="col s6 m6 input-field">
        <button
          id="step-1-next"
          type="submit"
          class="btn full-width-mobile-btn btn-no-shadow waves-effect waves-light green"
          @click="nextStep()"
          :disabled="!inputValid"
        >
          Next
        </button>
      </div>
    </div>

  </section>
</template>

<script>
  import EditableDropdown from './Dropdowns/EditableDropdown'
  import BusinessDropdown from './Dropdowns/BusinessDropdown'
  import DestinationPage from './DestinationPage'
  import ImageSelection from './ImageSelection'
  import HeadlineField from './HeadlineField'
  import DescriptionField from './DescriptionField'
  import AdditionalTextField from './AdditionalTextField'
  import AgentPresenceOptions from './AgentPresence/AgentPresenceOptions'
  import StatusBadgeOptions from './StatusBadge/StatusBadgeOptions'
  import Store from '../data/store'
  import CommonHelpers from '../mixins/helpers/common'
  import ConPanHelpers from '../mixins/helpers/conpan'
  import ValidationHelpers from '../mixins/helpers/validation'
  import NavigationHelpers from '../mixins/helpers/navigation'
  import { URL_REGEX } from '../constants/regex'

  export default {
    mixins: [CommonHelpers, ConPanHelpers, ValidationHelpers, NavigationHelpers],
    components: {
      ImageSelection,
      HeadlineField,
      DescriptionField,
      AdditionalTextField,
      EditableDropdown,
      BusinessDropdown,
      DestinationPage,
      AgentPresenceOptions,
      StatusBadgeOptions
    },
    data() {
      return Store
    },
    created() {
      // stop the sliders from being animated if the user clicks back to this screen
      this.showPreviewConPan = null
    },
    computed: {
      validDestinationUrl() {
        return this.dataLoading || URL_REGEX.test(this.adData.destinationUrl.trim())
      },
      validLocation() {
        return this.adData.location.trim() && (this.adData.location.length <= 50)
      },
      inputValid() {
        return this.form.headline.valid &&
          this.validDestinationUrl &&
          this.form.description.valid &&
          this.adData.imageUrl
      }
    },
    methods: {
      updateBusiness(value) {
        this.adData.selectedBusiness = value
      }
    }
  }
</script>

<style scoped lang="scss">
  .input-field {
    margin-top: 0;
  }

  #mobile-preview-btn button {
    height: 36px;
    color: black;
    background: white;
    border: solid LightGray 1px;
    border-radius: 2px;
    padding: 6px 1.5rem;
    text-transform: uppercase;
    @media (min-width: 769px) { display: none; }
    @media (min-width: 481px) and (max-width: 840px) {
      margin-right: 1em;
    }
  }

  #step-1-next {
    color: white;
  }

  .ad-image-container {
    margin-bottom: 0;

    @media (max-width: 600px) {
      margin-top: 32px;
    }
  }

  .modal-header {
    span {
      font-size: 28px;
    }

    a {
      float: right;
    }
  }

  .modal-footer {
    text-align: right;

    .modal-action {
      margin-right: 30px;
    }
  }
</style>
