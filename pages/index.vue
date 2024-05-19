<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <Avatar v-if="user" :user="user"/>
        <GameCard v-if="game" :game="game" @show-modal="showModal" @get-random-game="getRandomGame"/>
        <GamePage v-if="game" :game="game"/>
        <InputField v-if="!game" @get-steam-id="getSteamID"/>
        <transition name="fade">
          <div v-if="toast.visible" class="toast">
            <div class="alert alert-error inline-block">
              <span>{{ toast.text }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Avatar from '@/components/avatar.vue';
import GameCard from '@/components/game.vue';
import GamePage from '@/components/gamePage.vue';
import InputField from '@/components/input.vue';

export default {
  name: 'Home',
  components: {
    Avatar,
    GameCard,
    GamePage,
    InputField
  },
  data() {
    return {
      steamID: null,
      games: null,
      game: null,
      user: null,
      toast: {
        text: '',
        visible: false
      }
    };
  },
  methods: {

    // Main methods
    async getSteamID(steamProfileID) {
      try {
        this.steamID = await this.resolveSteamID(steamProfileID.trim());
        await this.getUserInfo();
      } catch (error) {
        this.showToast(error.message);
      }
    },
    async resolveSteamID(steamID) {
      const profileUrlPattern = /^(https:\/\/steamcommunity\.com\/(id|profiles)\/([^\/]+)\/?)$/; // RegEx. The only thing AI will always be better at than humans.
      const match = steamID.match(profileUrlPattern);
      if (match) return match[3];
      if (isNaN(steamID)) {
        const res = await axios.get(`/api/resolveVanityURL`, {params: {vanityurl: steamID}});
        if (res.data.error) throw new Error(res.data.error);
        return res.data.steamid;
      }
      return steamID;
    },
    async getUserInfo() {
      try {
        this.games = await this.fetchOwnedGames(this.steamID);
        this.user = await this.fetchUserInfo(this.steamID);
        await this.getRandomGame();
      } catch (error) {
        this.showToast(error.message);
      }
    },
    async getRandomGame() {
      const randomIndex = Math.floor(Math.random() * this.games.length);
      const appId = this.games[randomIndex].appid;
      try {
        this.game = await this.fetchGameDetails(appId);
      } catch (error) {
        this.showToast(error.message);
      }
    },

    // Fetch methods
    async fetchUserInfo(steamID) {
      const res = await axios.get(`/api/playerSummaries`, {params: {steamID}});
      if (res.data.error) throw new Error(res.data.error);
      return res.data;
    },
    async fetchOwnedGames(steamID) {
      const res = await axios.get(`/api/ownedGames`, {params: {steamID}});
      if (res.data.error) throw new Error(res.data.error);
      return res.data;
    },
    async fetchGameDetails(appId) {
      const res = await axios.get(`/api/appDetails`, {params: {appId}});
      if (res.data.error) throw new Error(res.data.error);
      return res.data;
    },

    // UI methods
    showModal() {
      const modal = document.getElementById('gameInfo');
      if (modal) modal.showModal();
    },
    showToast(message) {
      this.toast.text = message;
      this.toast.visible = true;
      setTimeout(() => {
        this.toast.visible = false;
      }, 3000);
    },
  }
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
  padding-bottom: 15%;
}

.toast {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  max-width: fit-content;
  transform: translateX(-50%);
  z-index: 50;
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>