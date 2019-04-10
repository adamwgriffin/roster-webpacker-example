<template>
  <div id="reach-preview">
    <div class="mobile-preview-header">
      <a class="moxi-ads-close-btn" @click="toggleConPan('showReachConPan')">
        <i class="material-icons">keyboard_backspace</i>
      </a>
      Preview
    </div>
    <div id="reach-header" class="grey-text">EXPECTED RANGE</div>
    <div class="reach-calculation-content" v-if="adData.expectedRangeMin && adData.expectedRangeMax">
      <div id="reach-amount">{{adData.expectedRangeMin}} - {{adData.expectedRangeMax}}</div>
      <div id="reach-quantity">people</div>
    </div>
    <div class="reach-calculation-content" v-else>
      See how many people you can reach
    </div>
    <div id="reach-recalculation" v-if="reachPending">
      <button
        id="reach-calculation-btn"
        type="submit"
        class="btn btn-no-shadow btn-back white btn-no-shadow waves-effect"
        @click="getReachEstimate()"
      >
        Calculate Reach
      </button>
    </div>
    <img id="reach-preview-img" v-bind:src="reachImage"/>
    <span class="grey-text">Increase your budget to reach more people</span>
  </div>
</template>

<script>
  import { reachEstimateMixin } from '../lib/reach.js'
  import Store from '../data/store'
  import ConPanHelpers from '../mixins/helpers/conpan'

  export default {
    mixins: [ConPanHelpers, reachEstimateMixin],
    data() {
      return Store
    },
    computed: {
      reachImage() {
        return Store.reachImages[Store.reachLevel]
      },

      validRange() {
        return (Store.adData.expectedRangeMin && Store.adData.expectedRangeMax)
      },

      rangeMinMax() {
        return [Store.adData.expectedRangeMin, Store.adData.expectedRangeMax]
      }
    },
    watch: {
      // Decrease or increase the rangeLevel to determine which preview image to show
      rangeMinMax(value, oldValue) {
        let min = parseInt(value[0].replace(',', ''))
        let max = parseInt(value[1].replace(',', ''))
        let oldMin = parseInt(oldValue[0].replace(',', ''))
        let oldMax = parseInt(oldValue[1].replace(',', ''))
        if (oldMin && oldMax) {
          if (oldMin < min || oldMax < max) {
            if (Store.reachLevel !== 5) {
              Store.reachLevel = Store.reachLevel + 1
            }
          } else if (oldMin > min || oldMax > max) {
            if (Store.reachLevel !== 1) {
              Store.reachLevel = Store.reachLevel - 1
            }
          }
        } else {
          // Default to middle level if not previous min/max
          Store.reachLevel = 3
        }
      }
    }
  }
</script>

<style>
  #reach-preview {
    text-align: center;
  }

  #reach-amount {
    font-size: 28px;
  }

  #reach-header {
    padding-top: 72px;
  }

  #reach-preview-img {
    padding-top: 16px;
    width: 360px;
  }

  .reach-calculation-content {
    margin-top: 10px;
  }

  #reach-calculation-btn {
    margin: 10px 0 10px 0;
    color: #4088C8;
  }

  .reach-loader {
    margin: 10px 0 10px 0;
    display: none;
  }
</style>
