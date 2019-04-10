<template>
  <div id="product-details">
    <h6>WHAT TO EXPECT NEXT</h6>
    <ol>
      <li>
        <p>Your ad will be submitted upon purchase</p>
        <div class="product-details-helper">
          <span>Your payment method will be charged at this point</span>
        </div>
      </li>
      <li>
        <p>Our little robots will place it</p>
        <div class="product-details-helper">
          <span>Your <span v-if="isListingAd">listing </span>advertisement will reach a mass of Facebook, Instagram and Display Network users</span>
        </div>
      </li>
      <li>
        <p>Achieve rockstar status!</p>
        <div class="product-details-helper">
          <span>Attract new buyers, win more listings, and grow that sphere!</span>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    props: ['isListingAd']
  }
</script>

<style lang="scss" scoped>
  #product-details {
    ol {
      list-style-type: none;
      margin-top: 0;
      padding-left: 0;
    }

    li {
      color: #000;
      font-weight: 400;
      font-size: 16px;
      padding-bottom: 24px;
      position: relative;
      margin-left: 35px;
      counter-increment: details-counter;
    }

    li::after {
      content: counter(details-counter);
      font-size: 100%;
      background-color: #000;
      color: #FFF;
      font-weight: bold;
      padding: 2px 10px;
      border-radius: 70%;
      left: -37px;
      top: 0;
      position: absolute;
    }

    li::before {
      /* lines */
      content:"";
      position: absolute;
      left: -24px; /* adjust manually */
      border-left: 1px solid #808080;
      height: 130%;
      width: 1px;
    }

    li:last-child:before {
      /* last li's line */
      height: 0; /* shorten the line so it goes only up to the bullet. Is equal to first-child:before's top */
    }

    p {
      margin-bottom: 5px;
    }

    h6 {
      padding-top: 32px;
      padding-bottom: 10px;
    }

    @media(max-width: 600px) {
      margin: 0 20px;
    }
  }

  .product-details-helper {
    font-size: 14px;
    font-weight: 300;
    color: #9498A0;
  }
</style>
