import Store from '../../data/store'

export default {
  methods: {
    toggleConPan(name) {
      // toggle whether to show the "con-pan" panel on mobile
      Store[name] = !Store[name]
    },
    animateConPan(name) {
      // don't animate if null because button wasn't clicked yet
      if (typeof Store[name] === 'boolean') {
        return Store[name] ? 'mobile-active' : 'mobile-inactive'
      }
    }
  }
}
