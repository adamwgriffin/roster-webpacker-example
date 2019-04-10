<template>
  <div v-if="showOption" class="row">
    <div class="cols s12 input-field">
      <form action="#">
        <div>
          <input
            type="checkbox"
            id="include-agent-presence"
            class="filled-in"
            @change="toggleAgentPresence"
            v-model="agentPresenceOptions.selected"
          />
          <label for="include-agent-presence">{{inputLabel}}</label>
        </div>
        <collapse-transition>
          <div v-if="showSubOptions" class="sub-options">
            <div v-for="option in availableSubOptions" :key="option.id" class="sub-option">
              <input
                :name="option.name"
                :id="option.name"
                class="with-gap"
                :value="option.name"
                type="radio"
                @change="addPresenceSubOption"
                v-model="agentPresenceOptions.subOption"
              />
              <label :for="option.name">{{ option.label }}</label>
            </div>
          </div>
        </collapse-transition>
      </form>
    </div>
  </div>
</template>

<script>
  /* eslint-disable camelcase */
  import Store from '../../data/store.js'
  import { CollapseTransition } from 'vue2-transitions'
  import { isEmpty, get } from 'lodash-es'

  export default {
    components: {
      CollapseTransition
    },

    computed: {
      inputLabel() {
        return this.userData.team ? 'Include name and image' : 'Include name and photo'
      },

      showAgentOption() {
        const { images } = this.userData.user
        return images && !isEmpty(images.full_url) && (images.title !== 'NOIMAGE')
      },

      showTeamPhotoOption() {
        return this.userData.team && this.userData.team.photo_url
      },

      showTeamLogoOption() {
        return this.userData.team && this.userData.team.logo_url
      },

      showOption() {
        return this.showAgentOption || this.showTeamPhotoOption || this.showTeamLogoOption
      },

      showSubOptions() {
        return this.agentPresenceOptions.selected && this.userData.team
      },

      availableSubOptions() {
        return this.getAvailableSubOptions()
      }
    },

    data() {
      return Store
    },

    methods: {
      setSelectedSubOption() {
        return new Promise((resolve) => {
          /* only return the subOptions we can show, depending on logic in getAvailableSubOptions(). select the 1st
          subOption if any are available. if a subOption was selected from a previously run ad, use that instead */
          const options = this.getAvailableSubOptions()
          if (options.length) {
            this.agentPresenceOptions.subOption = get(this.adData, 'agentPresence.subOption') || options[0].name
            resolve(this.agentPresenceOptions.subOption)
          }
        })
      },

      addAgentPresence() {
        const { firstname_display: first, lastname_display: last, images: {full_url, thumb_url} } = this.userData.user
        this.adData.agentPresence = {
          team: false,
          name: `${first} ${last}`.trim(),
          photo: full_url,
          thumbnail: thumb_url,
          subOption: this.agentPresenceOptions.subOption
        }
      },

      addTeamPresence() {
        const fieldName = (this.agentPresenceOptions.subOption === 'team-name-photo') ? 'photo_url' : 'logo_url'
        const photo = this.userData.team[fieldName]
        this.adData.agentPresence = {
          team: true,
          name: this.userData.team.name,
          photo: photo,
          thumbnail: photo,
          subOption: this.agentPresenceOptions.subOption
        }
      },

      async addPresenceSubOption() {
        /* once we reach this method, it needs to know the value of this.agentPresenceOptions.subOption, which may not
        be set yet. we need to run this.setSelectedSubOption() so the subOption will have a value. the radio buttons
        will not work correctly unless we do this part synchronously */
        if (this.agentPresenceOptions.subOption === '') await this.setSelectedSubOption()
        this.agentPresenceOptions.subOption === 'agent-name-photo' ? this.addAgentPresence() : this.addTeamPresence()
      },

      toggleAgentPresence() {
        if (!this.agentPresenceOptions.selected) {
          /* agent presence is selected, so toggle it off, and remove it from adData */
          this.adData.agentPresence = null
          return
        }
        /* agent presence isn't selected , so toggle it on by setting up this.adData.agentPresence with correct data */
        this.userData.team ? this.addPresenceSubOption() : this.addAgentPresence()
      },

      /* this method filters the subOptions in the store so that we only display the appropriate ones, e.g. if the user
      is not on a team showTeamPhotoOption() will return false and will be filtered out */
      getAvailableSubOptions() {
        return this.agentPresenceOptions.subOptionsData
          .filter((subOption) => {
            switch (subOption.name) {
              case 'agent-name-photo':
                return this.showAgentOption
              case 'team-name-photo':
                return this.showTeamPhotoOption
              case 'team-name-logo':
                return this.showTeamLogoOption
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-field {
    margin-top: 0;
  }

  .sub-options {
    margin-left: 30px;
  }

  .sub-option {
    margin: 6px 0;
  }
</style>
