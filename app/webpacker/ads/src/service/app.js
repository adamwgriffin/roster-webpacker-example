import { ROSTER_SERVICE_BASE } from '../constants/env'

export const getInitialData = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${ROSTER_SERVICE_BASE}/moxi_ads/api/v1/initial_data`,
      dataType: 'jsonp'
    })
      .done((res) => {
        resolve(res)
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        reject(new Error(`Fetching initial data failed: ${errorThrown}`))
      })
  })
}
