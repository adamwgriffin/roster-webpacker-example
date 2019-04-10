<template>
  <li :class="stepclass">

    <div class="heading">
      <div class="step-number">
        <i class="material-icons">done</i>
        <span class="number">{{ step.id }}</span>
      </div>

      <div class="title">{{ step.name }}</div>
    </div>

    <div class="body">
      <div class="step-name">
        <div v-if="currentstep > step.id" class="step-helper">
          <div class="helper-text">{{ step.helper_text }}</div>
          <div v-if="step.id === 2">{{ adData.expectedRangeMin }} - {{ adData.expectedRangeMax }}</div>
          <a href="#" @click="changeStep()">revisit</a>
        </div>
      </div>
    </div>

  </li>
</template>

<script>
  import Store from '../data/store'

  export default {
    data() {
      return Store
    },
    props: ['step'],
    computed: {
      stepclass() {
        return {
          'active': (this.step.id === this.currentstep),
          'complete': (this.step.id < this.currentstep)
        }
      },

      showRangeEstimate() {
        return this.step.id === 2 && this.adData.expectedRangeMin && this.adData.expectedRangeMax
      }
    },
    methods: {
      changeStep() {
        this.currentstep = this.step.id
      }
    }
  }
</script>

<style lang="scss" scoped>
  li {
    color: #ccc;

    &.active {
      color: white;
      font-weight: 600;
    }

    // so that the line won't display & it won't take up any room at the bottom
    &:last-child .body {
      display: none;
    }
  }

  .heading {
    display: flex;
    align-items: center;
  }

  .body {
    border-left: 1px solid #808080;
    margin-left: 12px;
    padding-left: 24px;
    padding-bottom: 24px;
  }

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #212e35;
    font-weight: bold;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin-right: 10px;

    i {
      display: none;
      color: white;
      font-size: 21px;
    }
  }

  .title {
    font-weight: 500;
    font-size: 16px;
  }

  .number {
    font-size: 14px;
  }

  .active {
    .step-number {
      background-color: #4c81c9;
      color: white;
    }
  }

  .complete {
    .step-number {
      background-color: #4c81c9;
    }
    i {
      display: inline-block;
    }

    .number {
      display: none;
    }
  }

  .step-helper {
    padding-top: 8px;
    font-weight: normal;
    font-size: 14px;

    .helper-text {
      color: #CCC;
    }

    a {
      display: inline-block;
      margin-top: 5px;
      color: #8cb9e3;
    }
  }

  @media (min-width: 480px) and (max-width: 1199px) {
    .title {
      display: none;
    }

    li {
      margin-left: 16px;
    }

    .step-name {
      display: none;
    }
  }
</style>
