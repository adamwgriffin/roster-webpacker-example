export default {
  computed: {
    cityStateZip() {
      const { city, state, zip } = this.listingData.location
      return this.joinCityStateZip(city, state, zip)
    },

    fullAddress() {
      const { address, city, state, zip } = this.listingData.location
      return this.joinFullAddress(address, city, state, zip)
    }
  },
  methods: {
    // these methods build an address that doesn't look weird when one or more fields are missing, as they often are
    joinCityStateZip(city, state, zip) {
      let stateZip = this.joinWithoutBlanks(' ', state, zip)
      return this.joinWithoutBlanks(', ', city, stateZip).toString().trim()
    },

    joinFullAddress(street, city, state, zip) {
      const cityStateZip = this.joinCityStateZip(city, state, zip)
      return this.joinWithoutBlanks(', ', street, cityStateZip).toString().trim()
    },

    // usage: joinWithoutBlanks(' ', 'one', 'two', 'three') or joinWithoutBlanks(' ', ...['one', 'two', 'three'])
    joinWithoutBlanks(separator, ...fields) {
      return fields.filter(val => val).join(separator)
    }
  }
}
