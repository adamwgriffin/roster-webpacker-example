<template>
  <div class="row">
    <div class="input-field col s12 m7">
      <div class="description-field">
        <div class="more-info-tooltip-wrapper">
          <div id="ad-description-label" class="grey-text" :class="{'invalid-input': invalidDescription}">
            Description
          </div>
        </div>
        <textarea
          ref="adDescription"
          name="description"
          id="ad-description-input"
          v-model="adData.description"
          @focus="fieldFocus"
          @blur="fieldBlur"
          autocomplete="off"
          class="materialize-textarea"
          :class="{'invalid': invalidDescription}"
          maxlength="125"
          placeholder="Enter a brief description about your ad"
        ></textarea>
        <span
          class="valid-description-text"
          :class="{'invalid-input': !validDescriptionText}"
          v-if="!validDescriptionText"
        >
          Description must start with a letter or a number.
        </span>
        <span class="input-counter">{{descriptionSize}}/125</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Store from '../data/store'
  import ValidationHelpers from '../mixins/helpers/validation'

  export default {
    mixins: [ValidationHelpers],

    data() {
      return Store
    },

    created() {
      this.validateDescription(this.adData.description)
    },

    mounted() {
      this.adjustDescriptionHeight()
    },

    watch: {
      'adData.description': function(newVal) {
        this.validateDescription(newVal)
      }
    },

    computed: {
      invalidDescription() {
        if (!this.form.description.touched) return false
        return !this.form.description.valid
      },

      validDescriptionText() {
        const { description } = this.adData
        return description.length === 0 || this.hasCorrectCharacters(description)
      },

      descriptionSize() {
        return this.adData.description.trim().length
      }
    },

    methods: {
      validateDescription(description) {
        this.form.description.valid = Boolean(
          description.trim() &&
            description.length <= 125 &&
            this.hasCorrectCharacters(description)
        )
      },

      hasCorrectCharacters(val) {
        return /^[a-zA-Z0-9]+/.test(val)
      },

      adjustDescriptionHeight(offset = 48) {
        this.$refs.adDescription.style.height = `${this.$refs.adDescription.scrollHeight - offset}px`
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/form_fields";

  #ad-description {
    padding-top: 8px;
    padding-bottom: 0;
    margin-bottom: 0;
    text-overflow: ellipsis;
  }
</style>
