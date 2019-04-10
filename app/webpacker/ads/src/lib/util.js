export const convertNumericStrings = (obj, keys=['ageMin', 'ageMax', 'distance']) => {
  const normalized = keys.reduce((acc, key) => {
    if (typeof obj[key] === 'string') { acc[key] = parseInt( obj[key].replace(/\D/g, '') ) }
    return acc
  }, {})
  return Object.assign(obj, normalized)
}
