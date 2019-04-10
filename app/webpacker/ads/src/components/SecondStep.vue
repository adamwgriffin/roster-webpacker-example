<template>
  <section>
    <div class="row">
      <div class="col s12">
        <h4 class="ayl-heading">Determine your Reach</h4>
      </div>
    </div>
    <div class="row options-row-header">
      <div class="col s12">
        <p>Set Budget</p>
      </div>
    </div>
    <div class="row options-row">
      <div class="col s12 m12 budget-text">
        <span class="budget-text-amount">Spend no more than </span>
        $
          <editable-dropdown
            id="ad-budget-input"
            class="budget-input"
            :class="{ 'budget-input-promo': showPromo }"
            v-model="budgetOption"
            :on-change="updateBudget"
            :options="budgetOptionsDisplay"
            :editable="false"
          ></editable-dropdown>
        <span class="budget-text budget-text-duration">over</span>
        <editable-dropdown
          id="ad-duration-input"
          class="budget-input"
          v-model="adData.selectedDuration"
          :on-change="updateDuration"
          :options="durationOptions"
          :editable="false"
          >
        </editable-dropdown>
      </div>
    </div>
    <div class="row options-row-header">
      <div class="col s12">
        <p>Choose Target Location</p>
      </div>
    </div>
    <div class="row options-row">
      <div class="col s12 m4">
        <editable-dropdown
          id="ad-location-type-input"
          class="location-type-input"
          v-model="adData.locationOption"
          :options="locationOptions"
          :editable="false"
          >
        </editable-dropdown>
      </div>
      <div class="col s12 m6 push-m3">
        <p class="help-tip" style="font-size: 12px; font-weight: 600; height: 1px; color: #212E35;"><span v-html="officeAddressDisplay"></span></p>
      </div>
    </div>
    <div class="row options-row options-input">
      <address-targeting v-if="adData.locationOption.value === 'address'"></address-targeting>
      <city-targeting v-if="adData.locationOption.value === 'city'"></city-targeting>
    </div>
    <div class="row">
      <div class="col s12 m12 input-field">
        <button id="potential-reach-btn" class="btn white btn-no-shadow btn-back waves-effect full-width-mobile-btn" @click="toggleConPan('showReachConPan')">Potential Reach</button>
      </div>
      <div class="col s6 m6 input-field">
        <button type="submit" class="btn btn-no-shadow btn-back white btn-no-shadow waves-effect waves-light" @click="backStep()">Back</button>
      </div>
      <div class="col s6 m6 right-align input-field">
        <button type="submit" class="btn btn-no-shadow waves-effect waves-light green" @click="nextStep()" v-bind:disabled="!inputValid">Next</button>
      </div>
    </div>
  </section>
</template>

<script>
  import EditableDropdown from './Dropdowns/EditableDropdown'
  import AddressTargeting from './LocationTargeting/AddressTargeting'
  import CityTargeting from './LocationTargeting/CityTargeting'
  import Store from '../data/store'
  import Marketing from '../service/marketing'
  import ConPanHelpers from '../mixins/helpers/conpan'
  import NavigationHelpers from '../mixins/helpers/navigation'
  import { reachEstimateMixin } from '../lib/reach.js'
  import Slider from './Slider'

  export default {
    mixins: [ConPanHelpers, NavigationHelpers, reachEstimateMixin],
    components: {
      EditableDropdown,
      AddressTargeting,
      CityTargeting,
      Slider
    },
    data() {
      return Store
    },
    created() {
      setTimeout(() => {
        this.updateBudget($('div').find('[data-budget-value]').parent().html())
      }, 250)
      this.pendReachEstimate()
      // stop the sliders from being animated if the user clicks back to this screen
      Store.showReachConPan = null
    },
    computed: {

      officeAddressDisplay() {
        if (Store.adData.locationOption.label === 'Office Address') {
          return `${Store.officeData.address} <br /> ${Store.officeData.city}, ${Store.officeData.state} ${Store.officeData.zip}`
        }
      },

      validLocationOption() {
        if (this.adData.locationOption.value === 'address' && this.adData.distance) {
          return true
        } else if (this.adData.locationOption.value === 'city' && this.adData.selectedCities.length > 0) {
          return true
        }
      },

      inputValid() {
        return this.adData.budget &&
          this.adData.duration &&
          this.validLocationOption
      }
    },
    methods: {
      updateBudget(value) {
        const { budgetValue, budgetSaleValue } = $($.parseHTML(value)).data()
        this.adData.budget = budgetSaleValue || budgetValue
        this.adData.budgetWithoutDiscount = budgetValue
        this.pendReachEstimate()
      },

      updateDuration(value) {
        this.adData.duration = value.value
        this.adData.selectedDuration = value
      },

      toggleOptions() {
        $('#advanced-options-link').toggleClass('open')
        $('#advanced-options').slideToggle()
      },

      nextStep() {
        // so that the final estimate will be available in the sidebar on the next step
        this.getReachEstimate()
        this.currentstep = this.currentstep + 1
      },

      pendReachEstimate() {
        /* reachPending = true means show the calculate button, false means hide it */
        switch (this.adData.locationOption.value) {
          case 'city':
            this.reachPending = this.adData.selectedCities.length > 0
            break
          default:
            this.reachPending = true
        }
      }
    },
    mounted() {
      Marketing.trackFeatureUsage(['configure', Store.listingData.listingid])
    }
  }
</script>

<style lang="scss" scoped>
  .budget-text {
    font-weight: normal;
    font-size: 24px;
    display: inline-block;
  }

  .budget-text-duration { margin: 0 8px; }

  @media (max-width: 600px) {
    .budget-text-amount {
      display: block;
    }

    .budget-text {
      font-size: 16px;
    }
  }

  @media (max-width: 320px) {
    .budget-text-duration { margin: 0 4px; }
  }

  #options-title {
    font-weight: 600;
    font-size: 14px;
    color: #212E35;
  }

  .options-input {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .options-help {
    height: 28px;
  }

  .options-row {
    margin-bottom: 36px;
  }

  .options-row-header p {
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0;
  }

  #advanced-options-link {
    display: flex;
    align-items: center;

    .material-icons {
      font-size: 20px;
      font-weight: 600;
      transition: transform 150ms cubic-bezier(1.000, -0.115, 0.975, 0.855);;
    }

    &.open {
      .material-icons {
        transform: rotate(180deg);
      }
    }
  }

  .advanced-options-link-label {
    color: #4c81c9;
  }

  #age {
    padding: 0 6px;
  }

  #potential-reach-btn {
    @media (min-width: 992px) { display: none; }
  }
</style>
