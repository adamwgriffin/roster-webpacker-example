<template>
  <div class="row">
    <div class="input-field col s12 m6">
      <div class="headline-field">
        <div class="more-info-tooltip-wrapper">
          <div class="grey-text" v-bind:class="{'invalid-input': invalid}">Headline</div>
          <i
            class="material-icons more-info-tooltip tooltipped action pointer hide-on-small-only"
            data-tooltip="Use one of our eye-catching headlines or create your own"
            data-position="top"
          >
            info_outline
          </i>
        </div>
        <editable-dropdown
          name="headline"
          id="ad-headline-input"
          v-model="adData.headline"
          @focus="fieldFocus"
          @blur="fieldBlur"
          :options="headlineOptions"
          :maxlength="25"
          :input-classes="{invalid: invalid}"
        >
        </editable-dropdown>
        <span class="input-counter">{{headlineSize}}/25</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Store from '../data/store'
  import ValidationHelpers from '../mixins/helpers/validation'
  import EditableDropdown from './Dropdowns/EditableDropdown'

  export default {
    mixins: [ValidationHelpers],

    data() {
      return Store
    },

    components: {
      EditableDropdown
    },

    created() {
      this.validateHeadline(this.adData.headline)
    },

    watch: {
      'adData.headline': function(newVal) {
        this.validateHeadline(newVal)
      }
    },

    computed: {
      invalid() {
        if (!this.form.headline.touched) return false
        return !this.form.headline.valid
      },

      headlineSize() {
        return this.adData.headline ? this.adData.headline.length : 0
      }
    },

    methods: {
      validateHeadline(value) {
        this.form.headline.valid = value.trim() && value.length <= 25
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/form_fields";

  .input-counter {
    padding-top: 6px;
    height: 12px;
  }
</style>
