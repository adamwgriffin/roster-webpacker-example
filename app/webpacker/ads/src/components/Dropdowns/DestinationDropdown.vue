<template>
  <section>
    <div class="input-field col m12">
      <div class="more-info-tooltip-wrapper">
        <div class="grey-text" :class="{'invalid-input': !validDestinationUrl}">Destination page</div>
        <i class="material-icons more-info-tooltip tooltipped action pointer hide-on-small-only" data-tooltip="Where you want people to go when they click on your ad. If you have your own website this is the perfect place to take them." data-position="top">info_outline</i>
      </div>
    </div>
    <div id="single-destination-field" class="input-field col s12 m6" v-if="optionsEmpty">
      <input type="url" name="ad-destination" id="ad-destination" autocomplete="off" v-model="Store.adData.destinationUrl" placeholder="Enter URL" />
      <span style="font-size: 12px;" :class="{'invalid-input': !validDestinationUrl}" v-if="!validDestinationUrl">Please enter a valid URL (e.g http://example.com)</span>
    </div>
    <div id="multi-destination-field" class="input-field col s12 m6" v-if="!optionsEmpty">
      <div class="editable-dropdown" :class="{open: open}" v-click-outside="closeDropdown">
        <span
          class="non-editable-dropdown-field"
          :class="inputClasses"
          @click="toggleDropdown"
          >
          {{getOptionDisplayLabel(value)}}
        </span>
        <i ref="openIndicator" role="presentation" class="open-indicator" @click="toggleDropdown"></i>
        <transition :name="transition">
          <ul ref="dropdownMenu" class="dropdown-menu" v-if="open">
            <li v-for="(option, index) in options">
              <div @mousedown.prevent="selectOption(option)" class="dropdown-selection">
                <div class="dropdown-selection-text">
                  <a>{{getOptionLabel(option)}}</a>
                  <a class="grey-text" v-if="getOptionDescription(option)">{{getOptionDescription(option)}}</a>
                </div>
                <div class="dropdown-selection-icon" v-if="showEditIcon(option)">
                  <i class="material-icons" @click="openCustomModal">create</i>
                </div>
              </div>
            </li>
          </ul>
        </transition>
      </div>
      <modal
        id="custom-destination-modal"
        heading="Custom Web Page"
        submit-label="Done"
        :on-close="cancelCustomDestination"
        :on-submit="updateCustomDestination"
        :on-cancel="cancelCustomDestination"
      >
        <input type="url" id="ad-custom-destination" v-model="customDestinationUrl" placeholder="Enter URL" />
        <span id="ad-custom-destination-error" class="destination-error invalid-input hide">
          Please enter a valid URL (e.g http://example.com)
        </span>
      </modal>
      <span class="destination-error" :class="{'invalid-input': !validDestinationUrl}" v-if="!validDestinationUrl">
        Please enter a valid URL (e.g http://example.com)
      </span>
    </div>
    <div class="col s12 m4 push-m2">
      <help-tip-button target="_blank" :prevent-default="false" :href="Store.adData.destinationUrl" v-if="validDestinationUrl">
        Go To Destination Page
      </help-tip-button>
    </div>
  </section>
</template>

<script>
  import isEmpty from 'lodash-es/isEmpty'
  import Store from '../../data/store'
  import { URL_REGEX } from '../../constants/regex'
  import DropdownHelpers from '../../mixins/helpers/dropdown'
  import HelpTipButton from '../HelpTipButton'
  import Modal from '../Modal'

  export default {
    components: { HelpTipButton, Modal },
    mixins: [DropdownHelpers],
    data() {
      return {
        open: this.keepOpen,
        customDestinationUrl: '',
        Store: Store
      }
    },
    props: {
      validDestinationUrl: Boolean,
      // callback to generate the label text. If option
      // is an object, returns option[this.label] by default.
      getOptionLabel: {
        type: Function,
        default(option) {
          if (typeof option === 'object') {
            if (this.label && option[this.label]) {
              return option[this.label]
            }
          }
          return option
        }
      },

      getOptionDisplayLabel: {
        type: Function,
        default(option) {
          if (typeof option === 'object') {
            if (this.label && option[this.label]) {
              if (option[this.label] === 'Custom') {
                return option['value'] || option[this.label]
              } else {
                return option[this.label]
              }
            }
          }
          return option
        }
      }
    },
    watch: {
      displayUrl(val) {
        this.Store.adData.displayUrl = val
      }
    },
    computed: {
      validCustomDestinationUrl() {
        return $.trim(this.customDestinationUrl) && (this.customDestinationUrl.length > 0) && URL_REGEX.test(this.customDestinationUrl.trim())
      },

      disableCustomDestinationButton() {
        return (!this.validCustomDestinationUrl || isEmpty(this.customDestinationUrl))
      },

      optionsEmpty() {
        return this.options.length === 0
      },

      displayUrl() {
        if (this.Store.adData.destinationUrl) {
          let parser = document.createElement('a')
          parser.href = this.Store.adData.destinationUrl
          return parser.hostname
        }
      }
    },
    methods: {
      openCustomModal() {
        $('#custom-destination-modal').openModal()
      },

      selectOption(option) {
        if (option.label === 'Custom' && !this.customDestinationUrl) {
          this.openCustomModal()
        } else if (option.label !== 'Custom') {
          this.updateDestination(option)
        }
        this.closeDropdown()
      },

      showEditIcon(option) {
        if (option['label'] === 'Custom' && option['value']) {
          return true
        }
      },

      cancelCustomDestination() {
        if (!this.customDestinationUrl) {
          this.Store.destinationOption = this.Store.destinationOptions[0]
          this.Store.adData.destinationUrl = this.Store.destinationOption.value
        }
        // Restore any changes made to the customDestinationUrl field
        let customDestinationOption = $.grep(this.Store.destinationOptions, function(o) { return o.label === 'Custom' })[0]
        this.customDestinationUrl = customDestinationOption.value
        $('#custom-destination-modal').closeModal()
      },

      updateCustomDestination() {
        if (this.validCustomDestinationUrl) {
          $('#ad-custom-destination').removeClass('invalid')
          $('#ad-custom-destination-error').addClass('hide')
          let customDestinationOption = $.grep(this.Store.destinationOptions, function(o) { return o.label === 'Custom' })[0]
          customDestinationOption.value = this.customDestinationUrl
          this.Store.destinationOption = customDestinationOption
          this.Store.adData.destinationUrl = customDestinationOption.value
          $('#custom-destination-modal').closeModal()
        } else {
          $('#ad-custom-destination').addClass('invalid')
          $('#ad-custom-destination-error').removeClass('hide')
        }
      },

      updateDestination(destinationOption) {
        this.customDestinationUrl = ''
        let customDestinationOption = $.grep(this.Store.destinationOptions, function(o) { return o.label === 'Custom' })[0]
        customDestinationOption.value = ''
        this.Store.destinationOption = destinationOption
        this.Store.adData.destinationUrl = destinationOption.value
      }
    },
    mounted() {
      $('.tooltipped').tooltip()
    }
  }
</script>

<style scoped lang="scss" src="../../scss/editable_dropdown.scss"></style>

<style scoped lang="scss">
  .destination-error {
    font-size: 12px;
  }

  #custom-destination-modal {
    .btn {
      background: #fafafa;
    }
  }
</style>
