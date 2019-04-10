import Store from '../data/store'
import { ROSTER_SERVICE_BASE, AGENT_UUID, SERVICE_BASE } from '../constants/env'

export default {
  getOfficeData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${SERVICE_BASE}/service/v1/profile/${AGENT_UUID}`,
        dataType: 'jsonp',
        success: function(res) {
          if (res.data && res.data.result_list && res.data.result_list[0].user_info[0]) {
            let profile = res.data.result_list[0].user_info[0]
            let office = profile.office
            Store.officeData.address = office.location.address
            Store.officeData.city = office.location.city
            Store.officeData.state = office.location.state
            Store.officeData.zip = office.location.zip
            // Set latitude and longitude if its not blank
            if (office.location.latitude !== '0.0' || office.location.latitude !== '0.0') {
              Store.officeData.latitude = office.location.latitude
              Store.officeData.longitude = office.location.longitude
            }
          } else {
            reject(new Error(`Profile not found for ${AGENT_UUID}`))
          }
          resolve(res)
        },
        error: function() {
          reject(new Error(`Fetch profile failed for ${AGENT_UUID}`))
        }
      })
    })
  },

  // TODO: get rid of this since we don't need it anymore
  getUserData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${ROSTER_SERVICE_BASE}/moxi_ads/api/v1/user_data/${Store.listingData.owner_uuid}`,
        dataType: 'jsonp'
      })
        .done((res) => {
          Store.userData = res.data
          resolve(res)
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          reject(new Error(`Fetching user images failed: ${errorThrown}`))
        })
    })
  }
}
