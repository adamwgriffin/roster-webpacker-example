<template>
  <div class="status-badge-options">
    <div v-if="adData.statusBadge">
      <div class="preview-container">
        <div class="grey-text">Status Badge</div>
        <status-badge-preview :background-color="adData.statusBadge.backgroundColor" :message="adData.statusBadge.text">
        </status-badge-preview>
      </div>
      <help-tip-button class="change" :on-click="openStatusBadgeModal">
        Change
      </help-tip-button>
      <help-tip-button class="remove" :on-click="removeStatusBadge">
        Remove
      </help-tip-button>
    </div>
    <help-tip-button v-else :on-click="openStatusBadgeModal">
      Add Status Badge
    </help-tip-button>
    <modal
      id="status-badge-modal"
      heading="Status Badge"
      submit-label="Update"
      :on-submit="updateStatusBadge"
    >
      <status-badge-editor></status-badge-editor>
    </modal>
  </div>
</template>

<script>
  import Store from '../../data/store'
  import HelpTipButton from '../HelpTipButton'
  import Modal from '../Modal'
  import StatusBadgeEditor from './StatusBadgeEditor'
  import StatusBadgePreview from './StatusBadgePreview'

  export default {
    components: { HelpTipButton, Modal, StatusBadgeEditor, StatusBadgePreview },

    data() {
      return Store
    },

    methods: {
      removeStatusBadge() {
        this.adData.statusBadge = null
      },

      openStatusBadgeModal() {
        $('#status-badge-modal').openModal()
      },

      updateStatusBadge() {
        this.adData.statusBadge = {
          backgroundColor: this.statusBadgeOptions.selectedColor,
          text: this.statusBadgeOptions.selectedMessage
        }
        $('#status-badge-modal').closeModal()
      }
    }
  }
</script>

<style lang="scss" scoped>
  #status-badge-modal {
    max-width: 640px;

    @media (max-width: 600px) {
      max-width: 326px;
    }

    @media (max-width: 320px) {
      max-width: 90%;
    }
  }

  .preview-container {
    margin: 10px;
  }

  .grey-text {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .change, .remove{
    min-width: 100px;
  }

  .change {
    margin-right: 16px;
  }

  @media (max-width: 768px) {
    .status-badge-options {
      margin-bottom: 20px;
    }
  }

  @media (max-width: 600px) {
    #status-badge-modal {
      width: 326px;
      max-height: 100%;
    }
  }

</style>

<style lang="scss">
  // this is in a separate style tag because it doesn't work inside a scoped style
  @media (max-width: 480px) {
    #status-badge-modal {
      &.modal .modal-content { padding: 24px; }
    }
  }

  @media (max-width: 320px) {
    #status-badge-modal {
      &.modal .modal-content { padding: 12px; }
    }
  }
</style>
