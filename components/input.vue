<template>
  <div v-if="!game">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Steam profile URL/Custom URL/SteamID</span>
      </div>
      <input v-model="steamProfileID" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"
        @keydown.enter="getSteamID" />
    </label>
    <button @click="getSteamID" :disabled="!steamProfileID" class="btn btn-neutral btn-wide"
      style="margin: 0.5rem">Go!</button>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      steamProfileID: ''
    };
  },
  methods: {
    getSteamID() {
      this.$emit('get-steam-id', this.steamProfileID);
    }
  }
};
</script>