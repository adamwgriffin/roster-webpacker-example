import Store from '../data/store'
import { ENVIRONMENT } from '../constants/env'

export default {
  /* ENG-78358 - Used to track the AYL purchase flow in Pardot */
  trackFeatureUsage(features=[]) {
    let productName = ''
    if (Store.productType.name === 'listing') {
      productName = 'ayl'
    } else if (Store.productType.name === 'service') {
      productName = 'ays'
    }
    if (window.piTracker && productName) {
      features = features.join('/')
      const url = `https://my-${ENVIRONMENT}.moxiworks.com/${productName}/${features}`
      if (ENVIRONMENT === 'qa') console.log('Tracking Pardot pi: ' + url)
      window.piTracker(url)
    } else {
      if (ENVIRONMENT === 'qa') console.error('Unable to load Pardot piTracker')
    }
  }

}
