import Store from '../data/store'
import { ROSTER_SERVICE_BASE, AGENT_UUID } from '../constants/env'

export default {
  getPageOptions() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${ROSTER_SERVICE_BASE}/moxi_ads/api/v1/facebook_page/populate_options/${AGENT_UUID}`,
        dataType: 'jsonp'
      })
        .done((res) => {
          if (res.data) {
            Store.businessOptions = res.data
            Store.adData.selectedBusiness = Store.businessOptions.filter(option => option.status === 'confirmed')[0]
          }
          resolve(res)
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          reject(new Error(`Fetch facebook page options failed: ${errorThrown}`))
        })
    })
  },

  searchCityLocation() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${ROSTER_SERVICE_BASE}/moxi_ads/api/v1/search_location/${Store.adData.locationOption.value}`,
        data: {
          location: Store.citySearch
        },
        dataType: 'jsonp'
      })
        .done((res) => {
          if (res.data) {
            Store.cityOptions = res.data
          }
          resolve(res)
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          reject(new Error(`Fetch facebook location search failed: ${errorThrown}`))
        })
    })
  }

}
