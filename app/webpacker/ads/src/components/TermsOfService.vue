<template>
  <div id="payment-tos">
    <input
      type="checkbox"
      class="filled-in"
      id="tos"
      v-model="tosAccepted"
    />
    <label for="tos">
      <span v-if="isListingAd">I certify that I am the listing or selling agent of this property, or
      if I am not the listing or selling agent I have written permission from the listing or selling agent to promote
      this listing as required by applicable MLS rules. </span>I <span v-if="isListingAd">also
      </span>certify that I own the copyright to the uploaded image, or I have written permission from the copyright
      owner to use the image for commercial purposes online, and I agree to all product polices defined in the <a
      href="https://base.moxiworks.com/docs/tos" target="_blank">Terms of Service</a>.
    </label>
  </div>
</template>

<script>
  import Store from '../data/store'
  import CommonHelpers from '../mixins/helpers/common'

  export default {
    mixins: [CommonHelpers],
    data() {
      return Store
    }
  }
</script>
