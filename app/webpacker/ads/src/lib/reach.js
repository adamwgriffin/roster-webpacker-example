import pick from 'lodash-es/pick'
import { convertNumericStrings } from './util'

const budgetRangeValues = {
  '49.00': [1000, 5000],
  '79.00': [2500, 8000],
  '99.00': [4000, 10500],
  '199.00': [9000, 20000],
  '399.00': [17500, 39000]
}

const addressWeights = [
  { lower: 41, upper: 50, weight: 1.0 },
  { lower: 31, upper: 40, weight: 0.9 },
  { lower: 21, upper: 30, weight: 0.8 },
  { lower: 0, upper: 20, weight: 0.7 }
]

const cityWeights = new Map([
  [1, 1.0],
  [2, 0.9],
  [3, 0.8]
])

const incomeWeight = 1.0

const roundToNearestHundred = (n) => Math.ceil(n / 100) * 100

const findWeight = (n, ranges) => {
  const selectedRange = ranges.find(r => n >= r.lower && n <= r.upper)
  return selectedRange ? selectedRange.weight : null
}

const calculateLocationWeight = (locationType, distance, cityCount) => {
  switch (locationType) {
    case 'address':
      return findWeight(distance, addressWeights)
    case 'city':
      // a count of 3 or greater is always the same weight
      return cityWeights.get(cityCount) || cityWeights.get(3)
  }
}

export const calculateReachEstimate = (estimateData) => {
  const locationWeight = calculateLocationWeight(
    estimateData.locationOption.value,
    estimateData.distance,
    estimateData.selectedCities.length
  )
  const totalWeightFactor = (locationWeight + incomeWeight) / 3
  const [lowerRange, upperRange] = budgetRangeValues[estimateData.budgetWithoutDiscount]
  const upperReach = roundToNearestHundred(totalWeightFactor * upperRange)
  const lowerReach = roundToNearestHundred( (1 - totalWeightFactor + 1) * lowerRange )
  return [lowerReach, upperReach]
}

export const reachEstimateMixin = {
  methods: {
    getReachEstimate() {
      const estimateData = pick(
        this.adData,
        [
          'budgetWithoutDiscount', 'distance', 'locationOption', 'selectedCities'
        ]
      )
      const normalizedEstimateData = convertNumericStrings( { ...estimateData, ageMax: estimateData.ageMax || 65 } )
      const [ lowerReach, upperReach ] = calculateReachEstimate(normalizedEstimateData).map(r => r.toLocaleString())
      this.adData.expectedRangeMin = lowerReach
      this.adData.expectedRangeMax = upperReach
      this.reachPending = false
    }
  }
}
