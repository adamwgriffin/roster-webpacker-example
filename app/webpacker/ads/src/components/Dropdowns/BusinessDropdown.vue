<template>
  <section>
    <div class="more-info-tooltip-wrapper">
      <div class="grey-text">Facebook Business</div>
      <i class="material-icons more-info-tooltip tooltipped action pointer hide-on-small-only" v-bind:data-tooltip="tooltip" data-position="top" v-if="tooltip">info_outline</i>
    </div>
    <div class="business-dropdown" :class="{open: open}" v-click-outside="closeDropdown">
      <div
        class="business-selection-field"
        :class="inputClasses"
        >
        <div class="business-selection-icon">
          <img :src="getOptionPicture(value)" />
        </div>
        <div class="business-selection-text">
          <p>{{getOptionName(value)}}</p>
          <a href="#" @click.prevent="toggleDropdown">Change</a>
        </div>
      </div>
      <transition :name="transition">
        <ul ref="dropdownMenu" class="business-menu" v-if="open">
          <li class="business-selection-item" v-for="(option, index) in confirmedOptions(options)" :key="index">
            <div class="business-selection" @mousedown.prevent="selectOption(option)">
              <div class="business-selection-icon" v-if="getOptionPicture(option)">
                <img :src="getOptionPicture(option)" />
              </div>
              <div class="business-selection-text">
                <p>{{getOptionName(option)}}</p>
                <p class="grey-text" v-if="getOptionUrl(option)">{{getOptionUrl(option)}}</p>
              </div>
            </div>
          </li>
          <li id="business-setup">
            <div id="business-setup-text" v-if="userOptionStatus(options) === 'pending'">
              <p>Add your own Facebook Business page</p>
              <span id="business-page-pending"><i class="material-icons">access_time</i>Request sent and pending your approval</span>
            </div>
            <div id="business-setup-text" v-else-if="!userOptionStatus(options)">
              <p>Add your own Facebook Business page</p>
              <a target="_blank" :href="businessSetupUrl">Set it up in My Account</a>
            </div>
            <div id="business-setup-faq">
              <p>Learn more at our <a target="_blank" :href="aylSupportUrl">FAQ's</a></p>
            </div>
          </li>
        </ul>
      </transition>
    </div>
  </section>
</template>

<script>
  import DropdownHelpers from '../../mixins/helpers/dropdown'
  import { ROSTER_SERVICE_BASE, AGENT_UUID } from '../../constants/env'

  export default {
    mixins: [DropdownHelpers],
    props: {
      // this is the value used for the tooltip text
      tooltip: {
        default: null
      },

      // tells business-dropdown what key to use when generating option
      // names when each option is an object.
      name: {
        type: String,
        default: 'name'
      },

      // callback to generate the label text. If option
      // is an object, returns option[this.label] by default.
      getOptionName: {
        type: Function,
        default(option) {
          if (typeof option === 'object') {
            if (this.name && option[this.name]) {
              return option[this.name]
            }
          }
          return ''
        }
      },

      // tells business-dropdown what key to use when generating option
      // url when each option is an object.
      url: {
        type: String,
        default: 'url'
      },

      // callback to generate the description text. If option
      // is an object, returns option[this.url] by default.
      getOptionUrl: {
        type: Function,
        default(option) {
          if (typeof option === 'object') {
            if (this.url && option[this.url]) {
              return option[this.url]
            }
          }
          return ''
        }
      },

      // tells business-dropdown what key to use when generating option
      // icons when each option is an object.
      picture: {
        type: String,
        default: 'picture'
      },

      // callback to generate the right icon. If option
      // is an object, returns option[this.icon] by default.
      getOptionPicture: {
        type: Function,
        default(option) {
          if (typeof option === 'object') {
            if (this.picture && option[this.picture]) {
              return option[this.picture]
            }
          }
          return ''
        }
      }
    },
    data() {
      return {open: this.keepOpen}
    },
    computed: {
      businessSetupUrl() {
        return `${ROSTER_SERVICE_BASE}/profile/${AGENT_UUID}/show?open_fb_connect=true`
      },
      aylSupportUrl() {
        return 'https://support.moxiworks.com/hc/en-us/articles/115003592443-Advertise-Your-Listings'
      }
    },
    methods: {
      confirmedOptions(options) {
        return options.filter(option => option.status === 'confirmed')
      },
      userOptionStatus(options) {
        const userOption = $.grep(options, function(e) { return e.type === 'user' })[0]
        return userOption ? userOption.status : null
      }
    },
    mounted() {
      $('.tooltipped').tooltip()
    }
  }
</script>

<style lang="scss">
  .business-dropdown {
    position: relative;

    /* Dropdown Menu */
    .business-menu {
      display: block;
      position: absolute;
      /* 99% rather than 100% covers the bottom border when it's open */
      top: 99%;
      left: 0;
      z-index: 1000;
      padding: 5px 0;
      margin: 0;
      width: 100%;
      overflow-y: auto;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
      list-style: none;
      background: #fff;
      cursor: pointer;
    }

    .business-selection-field {
      margin: 0;
      display: flex;
      align-items: center;
      height: 70px;
      box-sizing: content-box;
      word-break: break-all;

      p {
        cursor: default;
      }
    }

    .business-selection-icon img {
      height: 60px;
      width: 60px;
      margin-right: 16px;
      border: 1px solid #021a40;
    }

    p {
      margin: 0;
      font-size: 16px;
    }

    a {
      font-size: 12px;
    }

    ul {
      border: 1px solid #CCC;
    }

    li {
      line-height: 1.42857143; /* Normalize line height */
    }

    li:hover {

      .business-selection {
        background: #EEEEEE;
      }
    }

    .business-selection-item {
      padding: 10px;
      border-bottom: 1px solid #CCC;
    }

    .business-selection {
      display: flex;
      align-items: center;
      cursor: pointer;
      word-break: break-all;
    }

    .business-selection-text {
      p {
        display: block;
        clear: both;
        color: #333; /* Overrides most CSS frameworks */
      }
    }

    .business-menu {
      .active > p {
        color: #333;
        background: rgba(50, 50, 50, .1);
      }
    }

    #business-setup {
      padding-left: 10px;
      padding-bottom: 10px;

      #business-setup-text {
        padding-top: 20px;

        #business-page-pending {
          display: flex;
          align-items: center;
          font-size: 12px;
        }
      }

      #business-setup-faq {
        padding-top: 20px;
      }
    }

  }

</style>
