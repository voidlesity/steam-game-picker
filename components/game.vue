<template>
  <div v-if="game" class="card w-full bg-base-100 shadow-xl">
    <figure class="px-10 pt-10" style="cursor: pointer;">
      <div class="tooltip" data-tip="Show Game">
        <img @click="showModal" :src="game.header_image" :alt="game.name" class="rounded-xl" />
      </div>
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ game.name }}</h2>
      <div class="card-actions">
        <div class="flex-none tooltip tooltip-bottom" data-tip="Launch Game">
          <a :href="`steam://run/${game.steam_appid}/`" class="btn btn-primary">Launch</a>
        </div>
        <button @click="getRandomGame" class="btn btn-primary tooltip tooltip-bottom" data-tip="Re-roll">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M23 12c0 1.042-.154 2.045-.425 3h-2.101c.335-.94.526-1.947.526-3 0-4.962-4.037-9-9-9-1.706 0-3.296.484-4.655 1.314l1.858 2.686h-6.994l2.152-7 1.849 2.673c1.684-1.049 3.659-1.673 5.79-1.673 6.074 0 11 4.925 11 11zm-6.354 7.692c-1.357.826-2.944 1.308-4.646 1.308-4.962 0-9-4.038-9-9 0-1.053.191-2.06.525-3h-2.1c-.271.955-.425 1.958-.425 3 0 6.075 4.925 11 11 11 2.127 0 4.099-.621 5.78-1.667l1.853 2.667 2.152-6.989h-6.994l1.855 2.681z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    showModal() {
      this.$emit('show-modal');
    },
    getRandomGame() {
      this.$emit('get-random-game');
    }
  }
};
</script>