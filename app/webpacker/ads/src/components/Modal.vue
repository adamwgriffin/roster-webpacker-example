<template>
  <div :id="id" class="modal">
    <i class="material-icons x-modal-close modal-action modal-close" @click="onClose">clear</i>
    <div class="modal-content">
      <h4 class="modal-heading">{{heading}}</h4>
      <slot></slot>
    </div>
    <div class="modal-footer">
      <a
        href="#!"
        class="modal-action waves-effect btn-flat"
        @click="onSubmit"
      >
        {{submitLabel}}
      </a>
      <a
        href="#!"
        class="modal-action modal-close waves-effect btn-flat grey-text"
        @click="onCancel"
      >
        {{cancelLabel}}
      </a>
    </div>
  </div>
</template>

<script>
  import noop from 'lodash-es'

  export default {
    props: {
      id: String,
      heading: String,
      submitLabel: String,
      cancelLabel: {
        type: String,
        default: 'Cancel'
      },
      onClose: {
        type: Function,
        default: noop
      },
      onSubmit: {
        type: Function,
        default: noop
      },
      onCancel: {
        type: Function,
        default: noop
      }
    }
  }
</script>

<style lang="scss" scoped>
  .x-modal-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 24px;
    color: #787979;
    &.material-icons { font-size: 28px; }
    @media (max-width: 500px) {
      padding: 12px;
    }
  }

  .modal-heading {
    font-size: 28px;
  }
</style>
