<template>
  <section>
    <more-info-1 :is-listing-ad="isListingAd"></more-info-1>
    <more-info-2 :is-listing-ad="isListingAd"></more-info-2>
    <more-info-3 :is-listing-ad="isListingAd"></more-info-3>
  </section>
</template>

<script>
  import MoreInfo1 from './MoreInfo/MoreInfo1'
  import MoreInfo2 from './MoreInfo/MoreInfo2'
  import MoreInfo3 from './MoreInfo/MoreInfo3'

  export default {
    props: {
      isListingAd: Boolean
    },
    components: {
      MoreInfo1,
      MoreInfo2,
      MoreInfo3
    }
  }
</script>
