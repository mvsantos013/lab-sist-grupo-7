<template>
  <div>
    <h1 class="text-xl">Configurar Dataverse Source</h1>

    <h3 class="mt-5">API URL</h3>
    <input v-model="url" type="text" class="input-text" />

    <h3 class="mt-5">API Key</h3>
    <input v-model="apiKey" type="text" class="input-text" />

    <button class="btn primary" @click="saveDataverseClient">Salvar</button>
  </div>
</template>

<script>
import { handleResponse } from '@/frontend/utils/handleResponse';
import { ipcRenderer } from 'electron';

export default {
  name: 'ConfigDataverseClient',
  data: () => ({
    url: '',
    apiKey: '',
  }),
  methods: {
    async saveDataverseClient() {
      try {
        const loadClientResponse = await handleResponse(
          ipcRenderer.invoke(
            'save-dataverse-client-config',
            this.url,
            this.apiKey,
          ),
        );
        this.$emit('config', 'foi');
      } catch (e) {
        this.$emit('config', e);
      }
    },
  },
};
</script>

<style scoped></style>
