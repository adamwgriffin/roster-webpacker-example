export default {
  methods: {
    nextStep() {
      this.currentstep = this.currentstep + 1
    },
    backStep() {
      this.currentstep = this.currentstep - 1
    }
  }
}
