<template>
  <div class="header">
    <button class="btn primary">Perfis</button>
    <button class="btn secondary">+</button>
    <router-link class="btn primary" onclick="" to="/config"
      >Config</router-link
    >
  </div>
  <div class="app-body center">
    <router-link to="/upload" class="upload-card text-primary-500"
      >Upload</router-link
    >
  </div>
  <div class="footer"></div>
</template>

<script>
export default {
  name: 'Home',
  inject: ['AppContext'],
  mounted() {
    this.AppContext.showLoader = false;
  },
};
</script>
