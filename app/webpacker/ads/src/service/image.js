import Store from '../data/store'
import { ROSTER_SERVICE_BASE, AGENT_UUID } from '../constants/env'

export default {
  uploadImage() {
    return new Promise((resolve, reject) => {
      let fileInput = $('#hidden-file-input')[0]

      let formData = new FormData()
      formData.append('image', fileInput.files[0])
      formData.append('agent_uuid', AGENT_UUID)
      formData.append('ad_uuid', Store.adData.uuid)

      $.ajax({
        url: `${ROSTER_SERVICE_BASE}/moxi_ads/api/v1/upload_image`,
        type: 'POST',
        contentType: false,
        data: formData,
        processData: false
      })
        .done(function(res) {
          if (res.status === 'success') {
          // Remove previously uploaded image
            Store.imageData = $.grep(Store.imageData, function(i) {
              return i.full_url !== Store.uploadedImage.full_url
            })
            for (let i = 0; i < Store.imageData.length; i++) {
              Store.imageData[i].selected = false
            }
            // TODO: why is this using raw_url for small_url, thumb_url, etc?
            Store.uploadedImage = {
              full_url: res.urls.raw_url,
              gallery_url: res.urls.raw_url,
              mime_type: res.urls.mime_type,
              raw_url: res.urls.raw_url,
              small_url: res.urls.raw_url,
              thumb_url: res.urls.raw_url,
              uploaded: true,
              selected: true
            }
            Store.imageData = Store.imageData.concat([Store.uploadedImage])
            Store.adData.imageUrl = Store.uploadedImage.full_url
            Materialize.toast('Image successfully uploaded.', 3000, 'rounded')
            resolve(res)
          } else {
            Materialize.toast(res.message, 3000, 'rounded')
            reject(new Error('Image failed uploading. ' + res.message))
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          Materialize.toast(`Error uploading image: ${textStatus}`, 3000, 'rounded')
          reject(new Error(`Error uploading image: ${textStatus}`))
        })
    })
  },
  populateUploadedImages() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${ROSTER_SERVICE_BASE}/moxi_ads/api/v1/uploaded_images/${AGENT_UUID}`,
        dataType: 'jsonp'
      })
        .done(function(res) {
          if (res.status === 'success') {
            Store.imageData = Store.imageData.concat(res.data.result_list)
            resolve(res)
          } else {
            reject(new Error(`Fetching uploaded images for agent failed: ${res.message}`))
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          reject(new Error(`Fetching uploaded images for agent failed: ${errorThrown}`))
        })
    })
  },
  populatePreviousImages() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${ROSTER_SERVICE_BASE}/moxi_ads/api/v1/previous_images/${AGENT_UUID}`,
        dataType: 'jsonp'
      })
        .done(function(res) {
          if (res.status === 'success') {
            let previousImages = res.data.map(url => { let obj = {}; obj['full_url'] = url; return obj })
            Store.imageData = Store.imageData.concat(previousImages)
            // Remove any duplicates
            Store.imageData = Store.imageData.filter((obj, pos, arr) => {
              return arr.map(mapObj => mapObj['full_url']).indexOf(obj['full_url']) === pos
            })
            resolve(res)
          } else {
            reject(new Error(`Fetching previous images for agent failed: ${res.message}`))
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          reject(new Error(`Fetching previous images for agent failed: ${errorThrown}`))
        })
    })
  }
}
