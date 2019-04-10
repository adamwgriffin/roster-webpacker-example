<template>
  <div class="editor-container">
    <div class="editor-options">
      <div class="grey-text">
        Message
      </div>
      <editable-dropdown
        name="badge-message"
        id="badge-message"
        v-model="statusBadgeOptions.selectedMessage"
        :options="statusBadgeOptions.messages"
        :maxlength="20"
        :editable="false"
      >
      </editable-dropdown>
      <div class="grey-text">
        Background color
      </div>
      <div class="color-picker">
        <div v-for="(colorRow, index) in colorRows" :key="index" class="color-row">
          <div
            v-for="(color, i) in colorRow"
            :key="i"
            @click="updateColor(color)"
            class="color"
            :class="{ selected: statusBadgeOptions.selectedColor === color }"
            :style="{ background: color }"
          >
            <div class="selection">
              <i class="material-icons selection-checkmark">done</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="preview">
      <h1 class="preview-header">Preview</h1>
      <div class="status-badge-preview-container">
        <status-badge-preview :background-color="statusBadgeOptions.selectedColor" :message="statusBadgeOptions.selectedMessage">
        </status-badge-preview>
      </div>
    </div>
  </div>
</template>

<script>
  import { chunk } from 'lodash-es'
  import Store from '../../data/store'
  import EditableDropdown from '../Dropdowns/EditableDropdown'
  import StatusBadgePreview from './StatusBadgePreview'

  export default {
    components: { EditableDropdown, StatusBadgePreview },

    data() {
      return Store
    },

    computed: {
      colorRows() {
        return chunk(this.statusBadgeOptions.backgroundColors, 5)
      }
    },

    methods: {
      updateColor(color) {
        this.statusBadgeOptions.selectedColor = color
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor-container {
    display: flex;
    padding-top: 24px;
  }

  .editor-options {
    flex-grow: 1;
  }

  .grey-text {
    font-size: 14px;
  }

  .editable-dropdown {
    width: 260px;
    margin-bottom: 20px;
  }

  .color-picker {
    margin-top: 10px;
  }

  .color-row {
    display: flex;
  }

  .selection {
    background-color: rgba(0,0,0,0.21);
    position: absolute;
    top: 4px;
    right: 4px;
    bottom: 4px;
    left: 4px;
    display: none;
    align-items: center;
    justify-content: center;
  }

  .selection-checkmark {
    color: white;
    font-size: 15px;
  }

  .color, .selection {
    border-radius: 50%;
  }

  .color {
    position: relative;
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-right: 16px;
    margin-bottom: 8px;
    border-radius: 50%;
    transition: all .2s ease-in-out;

    &:not(.selected):hover { transform: scale(1.1); }

    &:last-child { margin-right: 0; }

    &.selected {
      .selection {
        display: flex;
      }
    }
  }

  .preview {
    display: flex;
    flex-direction: column;
    width: 214px;
    padding: 8px;
    background: #f0f0f0;
  }

  .preview-header {
    font-size: 14px;
    text-transform: uppercase;
    text-align: center;
    color: #808080;
    margin: 0;
  }

  .status-badge-preview-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 600px) {
    .editor-container {
      display: block;
    }

    .editor-options, .preview {
      margin: 0 auto;
    }

    .preview {
      margin: 24px auto 0 auto;
      height: 98px;
      width: 100%;
    }
  }
</style>
