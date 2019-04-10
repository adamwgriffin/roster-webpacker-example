<template>
  <div class="editable-dropdown" :class="{open: open}" v-click-outside="closeDropdown">
    <input
      :id="id"
      :name="name"
      v-if="editable"
      type="text"
      class="editable-dropdown-field" v-bind:class="inputClasses"
      ref="input"
      @focus="focus"
      @blur="blur"
      @input="updateValue($event.target.value)"
      :value="value"
      :maxlength="maxlength"
    >
    <span
      v-if="!editable"
      class="non-editable-dropdown-field"
      v-bind:class="inputClasses"
      @click="toggleDropdown"
      v-html="getOptionLabel(value)"
    >
    </span>
    <i ref="openIndicator" role="presentation" class="open-indicator" @click="toggleDropdown"></i>
    <transition :name="transition">
      <ul ref="dropdownMenu" class="dropdown-menu" v-if="open">
        <li v-for="(option, index) in options" :key="index">
          <div class="dropdown-selection">
            <div class="dropdown-selection-text">
              <a @mousedown.prevent="selectOption(option)" v-html="getOptionLabel(option)"></a>
              <a class="grey-text" @mousedown.prevent="selectOption(option)" v-if="getOptionDescription(option)">
                {{getOptionDescription(option)}}
              </a>
            </div>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
  import DropdownHelpers from '../../mixins/helpers/dropdown'

  export default {
    mixins: [DropdownHelpers],

    props: {
      id: {
        type: String
      },
      name: {
        type: String
      }
    },

    methods: {
      focus(e) {
        this.$emit('focus', e)
      },

      blur(e) {
        this.$emit('blur', e)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="../../scss/editable_dropdown.scss">
</style>
