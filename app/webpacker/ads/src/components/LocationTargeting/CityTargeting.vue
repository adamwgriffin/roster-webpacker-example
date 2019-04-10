<template>
  <section>
    <div id="location-city-selection" v-click-outside="closeDropdown" class="location-selection row">
      <div class="editable-dropdown col s12 m6" v-bind:class="{open: open}">
        <input
          type="text"
          class="editable-dropdown-field" v-bind:class="inputClasses"
          ref="input"
          v-model="Store.citySearch"
          >
        <transition :name="transition">
          <ul ref="dropdownMenu" class="dropdown-menu" v-if="open">
            <li v-if="Store.cityOptions.length === 0">
              <div class="dropdown-selection">
                <div class="dropdown-selection-text">
                  <a>No Results Found</a>
                </div>
              </div>
            </li>
            <li v-for="(option, index) in Store.cityOptions" :key="index">
              <div class="dropdown-selection">
                <div class="dropdown-selection-text">
                  <a @mousedown.prevent="selectOption(option)" v-html="getOptionLabel(option)"></a>
                </div>
              </div>
            </li>
          </ul>
        </transition>
      </div>
      <div class="col s12 m6">
        <button
          id="city-search-btn"
          type="submit"
          class="btn btn-no-shadow btn-back white btn-no-shadow waves-effect"
          @click="populateCities"
        >
          Search
        </button>
        <div class="search-loader">
          <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="location-selected-cities" class="location-selected row">
      <ul class="col s12 m6">
        <li v-for="(option, index) in Store.adData.selectedCities" v-bind:key="index">
          <div class="selected">
            <div>
              <span>{{option.name + ", " + option.region}}</span>
            </div>
            <div>
              <i class="material-icons" @click="removeOption(option)">clear</i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import Facebook from '../../service/facebook'
  import Store from '../../data/store'
  import DropdownHelpers from '../../mixins/helpers/dropdown'
  import 'ie-array-find-polyfill'

  export default {
    mixins: [DropdownHelpers],
    data() {
      return {
        open: this.keepOpen,
        Store: Store
      }
    },
    props: {
      // callback to generate the label text. If option
      // is an object, returns option[this.label] by default.
      getOptionLabel: {
        type: Function,
        default(option) {
          if (typeof option === 'object') {
            if (option['name'] && option['region']) {
              return option['name'] + ', ' + option['region']
            }
          }
          return option
        }
      }
    },

    created() {
      this.setReachPending()
    },

    methods: {
      removeOption(option) {
        Store.adData.selectedCities = Store.adData.selectedCities.filter(city => city.key !== option.key)
        this.setReachPending()
      },

      selectOption(option) {
        if (!Store.adData.selectedCities.find(city => city.key === option.key)) {
          Store.adData.selectedCities.push(option)
        }
        Store.citySearch = ''
        this.closeDropdown()
        this.setReachPending()
      },

      setReachPending() {
        Store.reachPending = Store.adData.selectedCities.length > 0
      },

      async populateCities() {
        $('#city-search-btn').hide()
        $('.search-loader').show()
        try {
          await Facebook.searchCityLocation()
          this.open = true
          $('#city-search-btn').show()
          $('.search-loader').hide()
        } catch (error) {
          console.error('Moxi Ads location search failed', error)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="../../scss/editable_dropdown.scss">
</style>

<style scoped lang="scss" src="../../scss/targeting_dropdown.scss">
</style>
