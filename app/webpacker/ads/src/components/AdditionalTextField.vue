<template>
  <div class="row">
    <div class="input-field col s12 m6">
      <div class="additional-text-field">
        <div class="more-info-tooltip-wrapper">
          <div class="grey-text" :class="{'invalid-input': invalid}">
            <span v-if="isListingAd">Location</span>
            <span v-else>Additional text</span>
          </div>
          <i
            class="material-icons more-info-tooltip tooltipped action pointer hide-on-small-only"
            :data-tooltip="iconTooltipText"
            data-position="top"
          >
            info_outline
          </i>
        </div>
        <input
          type="text"
          name="additionaltext"
          id="ad-additional-text-input"
          autocomplete="off"
          v-model="adData.location"
          @focus="fieldFocus"
          @blur="fieldBlur"
          :maxlength="maxInputLength"
          :placeholder="iputPlaceholder"
          :class="{'invalid': invalid}"
        />
        <span
          class="invalid-message"
          :class="{'invalid-input': invalid}"
          v-if="invalid"
        >
          The <span v-if="isListingAd">location description</span>
          <span v-else>additional text</span> needs to be between 1 and {{maxInputLength}} characters
        </span>
        <span
          class="invalid-character-length"
          :class="{'invalid-input': invalid}"
        >
          {{additionalTextSize}}/{{maxInputLength}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import Store from '../data/store'
  import CommonHelpers from '../mixins/helpers/common'
  import ValidationHelpers from '../mixins/helpers/validation'

  export default {
    mixins: [CommonHelpers, ValidationHelpers],

    data() {
      return Store
    },

    created() {
      this.validateAdditionalText(this.adData.location)
    },

    /* we are using adData.location for the additional text field for legacy purposes
    since the service depends on the location name to store the data */
    watch: {
      'adData.location': function(newVal) {
        this.validateAdditionalText(newVal)
      }
    },

    computed: {
      maxInputLength() {
        return 64
      },
      invalid() {
        if (!this.form.additionaltext.touched) return false
        return !this.form.additionaltext.valid
      },

      additionalTextSize() {
        return this.adData.location ? this.adData.location.length : 0
      },

      iconTooltipText() {
        return this.isListingAd ?
          'Emphasize the location to encourage people to visit your destination page' :
          'Add additional text to emphasize why people should visit your destination page'
      },

      iputPlaceholder() {
        return this.isListingAd ? 'Enter location' : 'Enter additional text'
      }
    },

    methods: {
      validateAdditionalText(text) {
        this.form.additionaltext.valid = Boolean(text.trim() && text.length <= this.maxInputLength)
      }
    }
  }
</script>

<style scoped lang="scss" src="../scss/form_fields.scss"></style>

<style lang="scss" scoped>
  .invalid-message, .invalid-character-length {
    font-size: 12px;
  }
  .invalid-character-length {
    float: right;
  }
</style>
