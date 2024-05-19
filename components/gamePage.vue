<template>
  <dialog id="gameInfo" class="modal">
    <div class="modal-box max-w-screen-2xl mockup-browser bg-base-300" style="padding: 0;">
      <div class="mockup-browser-toolbar" style="padding-top: 0.5rem;">
      </div>
      <div class="p-4">
        <div class="tooltip" data-tip="Open Steam page">
          <a :href="`https://store.steampowered.com/app/${game.steam_appid}`" target="_blank" class="link">
            <h1 class="text-4xl font-bold mb-4">{{ game.name }}</h1>
          </a>
        </div>
        <div class="flex">
          <div class="w-1/2">
            <img :src="game.screenshots[currentImageIndex]?.path_thumbnail || game.header_image" alt="Screenshot"
              class="mb-4 rounded-xl w-full">
            <div class="carousel w-full">
              <div v-for="(screenshot, index) in game.screenshots" :key="screenshot.id" class="carousel-item w-1/5"
                style="margin-left: 5px;">
                <img :src="screenshot.path_thumbnail" @click="currentImageIndex = index" alt="Screenshot"
                  class="cursor-pointer w-full rounded" />
              </div>
            </div>
            <div class="flex justify-center mt-4">
              <button @click="currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : 0"
                class="btn btn-xs btn-outline mr-2">Previous</button>
              <button
                @click="currentImageIndex = (currentImageIndex < game.screenshots.length - 1) ? currentImageIndex + 1 : game.screenshots.length - 1"
                class="btn btn-xs btn-outline">Next</button>
            </div>
          </div>
          <div class="w-1/2 pl-4">
            <img :src="game.header_image" :alt="game.name" class="mb-4 w-full">
            <div class="text-left">
              <p class="mb-4">{{ game.short_description }}</p>
              <table class="table w-full">
                <tbody>
                  <tr>
                    <td class="font-bold">Release Date:</td>
                    <td>{{ game.release_date.date }}</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Developer:</td>
                    <td>{{ game.developers.join(', ') }}</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Publisher:</td>
                    <td>{{ game.publishers.join(', ') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentImageIndex: 0
    };
  }
};
</script>

<style scoped>
.carousel-item {
  width: 115px;
}
</style>
