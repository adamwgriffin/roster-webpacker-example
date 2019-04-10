<template>
  <div id="promo-header" :style="headerStyle">
    <promo-header-brokerage-ad-preview id="test"></promo-header-brokerage-ad-preview>
    <div id="text">
      <div><strong>Ads on Sale Now.</strong> {{discount}}% off for a limited time</div>
      <div v-if="sponsor" id="sponsored-byline">Sponsored by {{sponsor}}</div>
    </div>
    <div id="discount">
      <div id="amount">{{discount}}</div> <div><div id="percent-symbol">%</div><div id="off">off</div></div>
    </div>
  </div>
</template>

<script>
  import PromoHeaderBrokerageAdPreview from './PromoHeaderBrokerageAdPreview'

  export default {
    components: { PromoHeaderBrokerageAdPreview },
    props: ['discount', 'headerStyle', 'sponsor']
  }
</script>

<style scoped lang="scss">
  #test {
    display: flex;
    align-self: center;
  }

  #promo-header {
    height: 60px;
    display: flex;
    justify-content: center;
  }

  #text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 40px 0 16px;
    color: white;

    #sponsored-byline {
      font-size: 10px;
    }
  }

  #discount {
    height: 27px;
    display: flex;
    align-items: center;
    background-color: white;
    color: #f44336;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.50);
    padding: 4px 6px 0 4px;

    #amount, #percent-symbol {
      font-weight: bold;
    }

    #amount {
      font-size: 22px;
      padding-right: 3px;
    }

    #percent-symbol {
      font-size: 9px;
      line-height: 1;
    }

    #off {
      font-size: 7px;
    }
  }
</style>
