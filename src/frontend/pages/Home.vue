<template>
  <div class="header">
    <button class="btn primary mr-3">Perfis</button>
    <button class="btn secondary">+</button>
    <div style="width: 100%"></div>
    <router-link class="btn primary" onclick="" to="/config"
      >Config</router-link
    >
  </div>
  <div class="sub-header">
    <button v-if="f" class="btn bg-red-400 text-white whitespace-nowrap large">
      Anonimizar {{ f }}
    </button>
  </div>

  <div class="app-body center">
    <router-link to="/upload" class="upload-card text-primary-500"
      >Upload</router-link
    >
  </div>

  <div class="footer"></div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
  name: 'Home',
  inject: ['AppContext'],
  data: function () {
    return {
      f: null,
    };
  },
  computed: {
    file: {
      get() {
        return this.file;
      },
      set(v) {
        this.f = v;
      },
    },
  },
  async mounted() {
    this.AppContext.showLoader = false;
    this.f = (await ipcRenderer.invoke('get-uploaded-file')).result;
  },
};
</script>
