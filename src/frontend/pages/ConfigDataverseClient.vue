<template>
  <div class="input-container pt-6">
    <h1 class="text-xl">Configurar Dataverse Source</h1>

    <h3 class="mt-5">API URL</h3>
    <input v-model="url" type="text" class="input-text" />

    <h3 class="mt-5">API Key</h3>
    <input v-model="apikey" type="text" class="input-text" />
  </div>
  <div class="input-container mt-4">
    <button class="btn secondary m-1" @click="cancel">Cancelar</button>
    <button class="btn primary m-1" @click="saveDataverseClient">Salvar</button>
  </div>
</template>

<script>
import { handleResponse } from '@/frontend/utils/handleResponse';
import { ipcRenderer } from 'electron';

export default {
  name: 'ConfigDataverseClient',
  data: () => ({
    url: '',
    apikey: '',
  }),
  inject: ['AppContext'],
  mounted() {
    this.AppContext.showLoader = false;
    this.url = this.AppContext.dataverseClientConfig.host;
    this.apikey = this.AppContext.dataverseClientConfig.apikey;
  },
  methods: {
    async cancel() {
      await this.$router.back();
    },
    async saveDataverseClient() {
      try {
        await handleResponse(
          ipcRenderer.invoke(
            'save-dataverse-client-config',
            this.url,
            this.apikey,
          ),
        );
        this.AppContext.dataverseClientConfig = null;
        await this.$router.push('/');
      } catch (e) {
        await this.$router.push({
          name: `Error`,
          params: { title: e.message.toString(), text: e.stack.toString() },
        });
      }
    },
  },
};
</script>
