import store from '../data/store'
import { ROSTER_SERVICE_BASE, AGENT_UUID } from '../constants/env'
import { setImageSelection, correctMediaType, nonPlaceHolderImagePresent } from '../lib/image'

export default {

  getListingData() {
    return new Promise((resolve, reject) => {
      let listingid = store.listingData.listingid
      let req = ''
      // If listing id is prefixed with 'p' then we know it's a pre-listing.
      if (listingid.toString().indexOf('p') === 0) {
        req = `${ROSTER_SERVICE_BASE}/pre_listing/return_pre_listing_data/${listingid.replace('p', '')}`
      } else {
        req = `${ROSTER_SERVICE_BASE}/listings/${AGENT_UUID}/get_listing/${listingid}`
      }
      $.ajax({
        url: req,
        dataType: 'jsonp',
        success: function(res) {
          if (res.location || (res.data && res.data.result_list)) {
            let loc = res.location || res.data.result_list[0].location
            store.listingData.location.address = loc.address
            store.listingData.location.city = loc.city
            store.listingData.location.state = loc.state
            store.listingData.location.zip = loc.zip
            // Set latitude and longitude if its not blank
            if (loc.latitude !== '0.0' || loc.latitude !== '0.0') {
              store.listingData.location.latitude = loc.latitude
              store.listingData.location.longitude = loc.longitude
            }
            store.listingData.images = res.images || []
            store.listingData.owner_uuid = res.agent.uuid
          } else {
            reject(new Error(`Listing not found for ${listingid}`))
          }
          resolve(res)
        },
        error: function(jqXHR, textStatus, errorThrown) {
          reject(new Error(`Fetch listing failed: ${errorThrown}`))
        }
      })
    })
  },

  getImageData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${ROSTER_SERVICE_BASE}/photogallery/api/v1/get_gallery_data/${store.listingData.listingid}`,
        dataType: 'jsonp',
        success: function(res) {
          // If a photo gallery is not found default to the MLS images associated with the listings
          if (res.status === 'error') {
            store.photoGalleryData.hasPhotoGallery = false
            // For right now display only the first image since that's
            // the only one that shows in Roster
            if (nonPlaceHolderImagePresent(store.listingData.images[0])) {
              let firstMlsImage = store.listingData.images[0]
              firstMlsImage.selected = true
              store.imageData = [firstMlsImage]
              store.listingData.main_image = firstMlsImage.small_url
            }
            resolve(res)
          } else {
            store.photoGalleryData.hasPhotoGallery = true
            store.photoGalleryData.galleryUUID = res.data.result_list[0].uuid
            const galleryMedias = res.data.result_list[0].gallery_categories
              .reduce((medias, category) => medias.concat(category.gallery_medias), [])
              .filter(media => correctMediaType(media))
            const imageData = galleryMedias.map(media => setImageSelection(media, store.adData.imageUrl))
            // If no valid images are found then default to the MLS image
            if (galleryMedias.length > 0) {
              store.photoGalleryData.gallery_medias = galleryMedias
              store.imageData = imageData
              const mainImage = galleryMedias.filter(media => media.main_image)[0]
              if (mainImage) {
                store.listingData.main_image = mainImage.urls.small_url
              }
              // If no main image was found select the first image
              if (!store.listingData.main_image) {
                store.imageData[0].selected = true
                store.listingData.main_image = store.imageData[0].small_url
              }
            } else if (nonPlaceHolderImagePresent(store.listingData.images[0])) {
              let firstMlsImage = store.listingData.images[0]
              firstMlsImage.selected = true
              store.imageData = [firstMlsImage]
              store.listingData.main_image = firstMlsImage.small_url
            }
            resolve(res)
          }
        }
      })
    })
  }

}
