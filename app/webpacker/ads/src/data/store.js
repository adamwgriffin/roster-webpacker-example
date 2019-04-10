module.exports = {
  currentstep: 1,
  showPreviewConPan: null,
  showImageConPan: null,
  showReachConPan: null,
  showPromo: false,
  dataLoading: true,
  agentPresenceOptions: {
    selected: false,
    /* subOption needs to be set in the store by the app in order for it to be the default selection. Vue will ignore
    the "checked" attribute in the html */
    subOption: '',
    subOptionsData: [
      { id: 1, name: 'agent-name-photo', label: 'Use agent name and photo' },
      { id: 2, name: 'team-name-photo', label: 'Use team name and photo' },
      { id: 3, name: 'team-name-logo', label: 'Use team name and logo' }
    ]
  },
  statusBadgeOptions: {
    backgroundColors: [
      '#f5a623', '#c967f2', '#f44336', '#ef6e41', '#cd5482',
      '#5092d3', '#50b64c', '#47c4b5', '#212e35', '#636c71'
    ],
    messages: ['Open House', 'Just Listed', 'Just Sold', 'Price Reduction', 'Coming Soon'],
    selectedColor: '#f5a623',
    selectedMessage: 'Open House'
  },
  steps: [
    {
      id: 1,
      name: 'Create your Ad',
      helper_text: 'Your ad looks stunning!'
    },
    {
      id: 2,
      name: 'Determine Ad Range'
      /*
      TODO: clean this up once we decided how to handle expected range without Facebook estimate
      helper_text: 'Expected Range'
      */
    },
    {
      id: 3,
      name: 'Checkout'
    }
  ],
  productInfo: {},
  products: {},
  productType: {
    'name': ''
  },
  promoData: {},
  headlineOptions: [],
  aylHeadlineOptions: [
    'Just Listed for Sale',
    'New Construction for Sale',
    'New on the Market',
    'Trendy Neighborhood Home'
  ],
  aysHeadlineOptions: [
    'Your Local Expert',
    "Keep Calm, I'm a Realtor",
    'Helping You Find a Home',
    'I Can Guide You Home!',
    'Selling Made Easy'
  ],
  destinationOptions: [],
  destinationOption: '',
  businessOptions: [],
  businessOption: '',
  customDestinationUrl: '',
  budgetOptions: [
    '49.00',
    '79.00',
    '99.00',
    '199.00',
    '399.00'
  ],
  budgetOption: '',
  budgetOptionsDisplay: [],
  durationOptions: [
    {'label': '3 days', 'value': '3'},
    {'label': '5 days', 'value': '5'},
    {'label': '1 week', 'value': '7'},
    {'label': '2 weeks', 'value': '14'},
    {'label': '3 weeks', 'value': '21'}
  ],
  locationOptions: [],
  aylLocationOptions: [
    {'label': 'Listing Address', 'value': 'address'},
    {'label': 'City', 'value': 'city'}
  ],
  aysLocationOptions: [
    {'label': 'Office Address', 'value': 'address'},
    {'label': 'City', 'value': 'city'}
  ],
  citySearch: '',
  cityOptions: [],
  distanceDisplay: '',
  reachLevel: 0,
  reachImages: {
    '0': 'https://moxi1.ssl.hwcdn.net/img-pr/i/8f7648942ce0118f7752c6813f044da1b9b33108/0_3_raw.png',
    '1': 'https://moxi1.ssl.hwcdn.net/img-pr/i/fd3d198bb8aa0ef370bb685045169aa2e94ef3e6/0_2_raw.png',
    '2': 'https://moxi1.ssl.hwcdn.net/img-pr/i/2ffaaf2a859f42d24f70ea1a670824f2232109cc/0_2_raw.png',
    '3': 'https://moxi1.ssl.hwcdn.net/img-pr/i/e6fb2e4c575472ab03ba81603006f81cebb2e43f/0_2_raw.png',
    '4': 'https://moxi1.ssl.hwcdn.net/img-pr/i/dd4209daa7313f85673f661d10c3a144500770e6/0_2_raw.png',
    '5': 'https://moxi1.ssl.hwcdn.net/img-pr/i/8cefb609afdd2774a70d6ed98b281b0ec2ff72ab/0_2_raw.png'
  },
  reachPending: true,
  tosAccepted: false,
  salesTax: '0.00',
  // Basic holder for the ad data to be submitted.
  adData: {
    uuid: '',
    adType: 'news-feed',
    headline: '',
    destinationUrl: '',
    selectedBusiness: {},
    displayUrl: '',
    description: '',
    location: '',
    imageUrl: '',
    imageDimensions: {},
    budget: '',
    budgetWithoutDiscount: '',
    duration: '',
    selectedDuration: '',
    distance: '50',
    expectedRangeMin: '',
    expectedRangeMax: '',
    previewUrl: '',
    locationOption: {},
    address: '',
    addressLine1: '',
    addressLine2: '',
    latitude: '',
    longitude: '',
    selectedCities: [],
    status: 'pending',
    start_date: '',
    product_url: '',
    product_uuid: '',
    agent_uuid: '',
    owner_uuid: '',
    company_uuid: '',
    listing_id: '',
    promoData: {},
    agentPresence: null,
    statusBadge: null
  },
  form: {
    headline: {
      valid: true,
      active: false,
      touched: false
    },
    description: {
      valid: true,
      active: false,
      touched: false
    },
    additionaltext: {
      valid: true,
      active: false,
      touched: false
    }
  },
  // Basic holder for the listing data.
  // ListingID is set in the listing.js file via env.js
  listingData: {
    listingid: '',
    main_image: '',
    location: {
      address: '',
      city: '',
      state: '',
      zip: '',
      latitude: '',
      longitude: ''
    },
    description: '',
    images: [],
    details_url: '',
    owner_uuid: ''
  },
  photoGalleryData: {
    hasPhotoGallery: false,
    galleryUUID: '',
    gallery_medias: [{
      uuid: '',
      main_image: false,
      urls: {
        full_url: ''
      }
    }]
  },
  imageData: [],
  uploadedImage: {},
  imageUploadEnabled: true,
  userData: {
    user: {
      firstname_display: '',
      lastname_display: '',
      images: {
        full_url: '',
        thumb_url: ''
      }
    }
  },
  // Basic holder for the agents office data.
  officeData: {
    address: '',
    city: '',
    state: '',
    zip: '',
    latitude: '',
    longitude: ''
  },
  companyData: {
    // put a default value in here just in case nothing comes back from branding
    name: 'Your Brokerage',
    branding: { background_color_primary: '#377cbf' }
  },
  payment_provider: 'braintree',
  bt_client_token: '',
  bt_device_data: '',
  payment_method_nonce: '',
  amz_ref_id: '',
  paymentSubmitted: false,
  errorModalHeader: '',
  errorModalBody: '',
  errorModalType: '',
  createAdErrorHeader: 'Ad Creation Error',
  createAdErrorBody: "Oh no! Something didn't go as planned and your listing ad could not be created. The ad was not submitted to Facebook. Your transaction process has been terminated and no charges have occurred. Please try again later!",
  paymentErrorHeader: 'Transaction Error',
  paymentErrorBody: "Oh no! It looks like your payment didn't go through. The ad was not submitted to Facebook. Your transaction process has been terminated and no charges have occurred. Please try a new payment method.",
  promoErrorHeader: 'This Promotion Has Ended',
  promoErrorBody: 'Unfortunately, this promotion has ended. However, you can still purchase this ad at the normal price.',
  activateErrorHeader: 'Ad Activation Error',
  activateErrorBody: "Oh no! Something didn't go as planned and your listing ad did not activate in Facebook. Please contact our support staff for assistance.",
  payment_sr: null,
  previousAdData: {
    uuid: ''
  }
}
