<template>
  <div class="noUi-target noUi-ltr noUi-horizontal" :id="id"></div>
</template>

<script>
  import noUiSlider from 'nouislider'
  import wNumb from 'wnumb'

  export default {
    props: {
      start: Array,
      connect: {
        type: [Boolean, Array],
        default: true
      },
      step: Number,
      rangeMin: Number,
      rangeMax: Number,
      formatDecimals: {
        type: Number,
        default: 0
      },
      onSlide: Function
    },

    data() {
      return {
        id: null
      }
    },

    created() {
      // this._uid is a unique ID that Vue assigns to the component
      this.id = this._uid
    },

    mounted() {
      const slider = document.getElementById(this.id)
      noUiSlider.create(slider, {
        start: this.start,
        connect: this.connect,
        step: this.step,
        range: {
          'min': this.rangeMin,
          'max': this.rangeMax
        },
        format: wNumb({
          decimals: this.formatDecimals
        })
      })
      slider.noUiSlider.on('slide', this.onSlide)
    }
  }
</script>

<style lang="scss" scoped src="../scss/nouislider.scss"></style>
