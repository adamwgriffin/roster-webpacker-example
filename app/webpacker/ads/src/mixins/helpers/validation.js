export default {
  methods: {
    // these rely on the field element's ID to be the same as it is in the form object
    // we use in the store, e.g., form.description.active
    fieldFocus(e) {
      this.form[e.target.name].active = true
    },

    fieldBlur(e) {
      this.form[e.target.name].active = false
      this.form[e.target.name].touched = true
    }
  }
}
