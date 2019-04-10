<template>
  <div class="container" :class="presenceType">
    <img v-show="team" class="photo team-photo" :src="photoSrc">
    <div v-show="!team" class="photo agent-photo" :style="photoBackground"></div>
    <div class="name team-name">{{ name }}</div>
  </div>
</template>

<script>
  export default {
    props: { team: Boolean, name: String, photo: String },

    computed: {
      photoSrc() {
        return this.team ? this.photo.replace(/(\d+_\d+_)(raw)(.\w+$)/, '$1thumb$3') : this.photo
      },
      photoBackground() {
        return { backgroundImage: `url("${this.photo}")` }
      },
      presenceType() {
        return { team: this.team }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../scss/colors.scss";

  .container {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.67) 100%);
    width: 100%;
    padding: 5px;
  }

  .photo {
    z-index: 1;
    position: relative; // so that it can overlap the name when using negative margins
    border: solid white 1px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.50);
    background-color: white;
  }

  .agent-photo {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: top/cover no-repeat;
  }

  .team-photo {
    max-width: 96px;
    max-height: 48px;
  }

  .name {
    display: flex;
    align-items: center;
    background: white;
    opacity: 0.82;
    height: 28px;
    padding: 5px;
    font-weight: bold;
    font-size: 14px;
    color: $ad-title;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    margin-left: -5px;
  }
</style>
