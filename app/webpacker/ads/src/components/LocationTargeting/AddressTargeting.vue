<template>
  <section>
    <div class="col s12 m6">
      <div>Distance from listing</div>
      <slider
        :start="[adData.distance]"
        :connect="[true, false]"
        :step="1"
        :range-min="15"
        :range-max="50"
        :on-slide="updateDistance"
      ></slider>
      <div class="options-help">
        <span class="miles left">15 mi</span>
        <span class="miles right">50 mi</span>
      </div>
    </div>
    <div class="col s12 m6 push-m1">
      <p class="help-tip">{{adData.distance}} mile radius</p>
    </div>
  </section>
</template>

<script>
  import Store from '../../data/store'
  import Slider from '../Slider'

  export default {
    components: {Slider},
    data() {
      return Store
    },
    created() {
      this.reachPending = true
    },
    methods: {
      updateDistance(values) {
        this.adData.distance = values[0]
        this.reachPending = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .help-tip {
    font-size: 12px;
    font-weight: 600;
    color: #212E35;
  }

  .miles {
    font-size: 12px;
    height: 14px;
  }
</style>
