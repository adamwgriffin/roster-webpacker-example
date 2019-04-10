export const setImageSelection = (media, adDataImage) => {
  const selected = (adDataImage && adDataImage === media.urls.full_url) ||
    (!adDataImage && media.main_image)
  return { ...media.urls, selected: selected }
}

export const correctMediaType = (media) => {
  return media.urls &&
    /^image\/(jpeg|jpg|png|gif)$/.test(media.mime_type) &&
    (media.urls.height >= 133 && media.urls.width >= 254)
}

export const nonPlaceHolderImagePresent = imageData => imageData && imageData.title !== 'NOIMAGE'

export const getImageUrl = (imageData) => {
  const image = imageData.filter((img) => img.selected)[0]
  return image ? image.full_url : ''
}

export const getImageDimensions = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => { resolve({ width: img.width, height: img.height }) })
    img.addEventListener('error', () => { reject(new Error('Unable to get ImageDimensions')) })
    img.src = imageUrl
  })
}

export const notRawUrl = imageUrl => !/\/\d+_\d+_raw\.\w+$/.test(imageUrl)

export const returnImageDimensionsAndUrl = (imageUrl) => {
  return new Promise(async (resolve, reject) => {
    if (imageUrl) {
      try {
        const dimensions = await getImageDimensions(imageUrl)
        if (dimensions.height < 628 && notRawUrl(imageUrl)) {
          // try using the raw version instead, in case it's closer to the ideal facebook dimensions
          const rawImageUrl = imageUrl.replace(/(\/\d+_\d+_)(\w+)(\.\w+)$/, '$1raw$3')
          returnImageDimensionsAndUrl(rawImageUrl)
        }
        resolve( Object.assign(dimensions, { imageUrl: imageUrl }) )
      } catch (error) {
        console.error(error)
        resolve( { imageUrl: imageUrl } )
      }
    } else {
      reject(new Error('No imageUrl available'))
    }
  })
}
