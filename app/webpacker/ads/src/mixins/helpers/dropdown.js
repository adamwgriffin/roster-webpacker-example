export default {
  props: {
    // this is the value that is passed to the component via v-model="adData.headline"
    value: {
      default: null
    },

    // An optional callback function that is called each time the selected
    // value(s) change. When integrating with Vuex, use this callback to trigger
    // an action, rather than using :value.sync to retreive the selected value.
    onChange: {
      type: Function,
      default(val) {
        this.$emit('input', val)
      }
    },

    maxlength: {
      type: Number,
      default: null
    },

    editable: {
      type: Boolean,
      default: true
    },

    // passing options in as props, e.g., :options="headlineOptions"
    options: {
      type: Array,
      default() {
        return []
      }
    },

    // tells editable-dropdown what key to use when generating option
    // labels when each option is an object.
    label: {
      type: String,
      default: 'label'
    },

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

    // tells editable-dropdown what key to use when generating option
    // descriptions when each option is an object.
    description: {
      type: String,
      default: 'description'
    },

    // callback to generate the description text. If option
    // is an object, returns option[this.description] by default.
    getOptionDescription: {
      type: Function,
      default(option) {
        if (typeof option === 'object') {
          if (this.description && option[this.description]) {
            return option[this.description]
          }
        }
        return ''
      }
    },

    // sets a Vue transition property on the .dropdown-menu. you can override the default with a custom transition
    transition: {
      type: String,
      default: 'fade'
    },

    // pass an object with classes to the input element of the dropdown like so:
    // <editable-dropdown v-bind:input-classes="{'classname': !validHeadline, otherclassname: true}">
    inputClasses: {
      type: Object,
      default: null
    },

    // set this prop to "true" in dev so that it's convenient to inpect the dropdown menu,
    // otherwise it will annoyingly close as soon as you right-click it
    keepOpen: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {open: this.keepOpen}
  },
  watch: {
    // watch for changes to value property. calling this.onChange(val) prop will execute
    // whatever callback function that was pass to the component, e.g., :on-change="updateBudget"
    value(val) {
      this.onChange(val)
    }
  },
  methods: {
    updateValue(value) {
      // propogate the updated input back to the parent component using $emit
      // other components that are bound to the same model--such as FacebookPreview--will get the change
      this.$emit('input', value)
    },

    toggleDropdown() {
      if (!this.keepOpen && this.open) {
        this.open = false
      } else {
        this.open = true
      }
    },

    closeDropdown() {
      if (!this.keepOpen) this.open = false
    },

    selectOption(option) {
      this.updateValue(option)
      this.closeDropdown()
    }
  },
  directives: {
    // a custom directive to detect when user clicks outside of component
    // https://stackoverflow.com/questions/36170425/detect-click-outside-element
    clickOutside: {
      bind(el, binding, vnode) {
        el.event = function(event) {
          // check that click was outside the el and it's children
          if (!(el === event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.event)
      },

      unbind(el) {
        document.body.removeEventListener('click', el.event)
      }
    }
  }
}
