<template>
  <div v-if="user" class="avatar tooltip" :data-tip="`Library of: ${user.personaname}`" style="margin-bottom: 2rem;">
    <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
      <img :src="user.avatarfull" alt="User Avatar" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>