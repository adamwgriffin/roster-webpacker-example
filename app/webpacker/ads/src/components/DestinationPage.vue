<template>
  <div class="row">
    <destination-dropdown
      id="ad-destination-input"
      class="destination-input"
      v-model="destinationOption"
      :options="destinationOptions"
      :valid-destination-url="validDestinationUrl"
    ></destination-dropdown>
  </div>
</template>

<script>
  import Store from '../data/store'
  import DestinationDropdown from './Dropdowns/DestinationDropdown'

  export default {
    props: { validDestinationUrl: Boolean },

    components: { DestinationDropdown },

    data() {
      return Store
    }
  }
</script>
