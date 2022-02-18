<template>
  <div class="p-3" style="max-width: 30rem">
    <h1 class="text-xl">Anonimizador</h1>

    <h3 class="mt-5">API URL</h3>
    <input
      v-model="url"
      type="text"
      class="border border-primary-500 rounded-sm px-1 w-full"
    />

    <h3 class="mt-5">API Key</h3>
    <input
      v-model="apiKey"
      type="text"
      class="border border-primary-500 rounded-sm px-1 w-full"
    />

    <h3 class="mt-5">Dataverse Alias</h3>
    <div class="flex flex-nowrap items-center">
      <input
        v-model="dataverseAlias"
        type="text"
        class="border border-primary-500 rounded-sm px-1 flex-grow"
      />

      <button
        class="m-1 app-btn primary text-sm text-white font-bold py-1 px-2 rounded ml-3 w-40"
        @click="loadDataVerse"
      >
        Carregar Dataverse
      </button>
    </div>

    <h3 class="mt-5">Dataverse Dataset Persistent ID</h3>

    <div class="flex items-center">
      <input
        v-model="datasetId"
        autofocus
        type="text"
        class="border border-primary-500 rounded-sm px-1 flex-grow"
      />

      <button
        class="m-1 app-btn secondary text-sm text-white font-bold py-1 px-2 rounded ml-3 w-40"
        :class="{
          disabled: !clientLoaded,
        }"
        :disabled="clientLoaded"
        @click="loadDataset"
      >
        Carregar Dataset
      </button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
  data() {
    return {
      url: 'https://dataverse.harvard.edu',
      apiKey: 'ed1a27d8-9362-4579-8d10-3355fb7823b6',
      datasetId: 'doi:10.7910/DVN/JCCOAT',
      dataverseAlias: 'lab-sist-info-grupo-7',
      clientLoaded: false,
    };
  },
  async mounted() {
    const test = await ipcRenderer.invoke('db-get-config-values');
    console.log(test);
  },
  methods: {
    async loadDataVerse() {
      try {
        const loadClientResponse = await ipcRenderer.invoke(
          'load-dataverse-client',
          this.url,
          this.apiKey,
        );
        this.clientLoaded = true;
        console.log(loadClientResponse);
        const loadDataverseResponse = await ipcRenderer.invoke(
          'load-dataverse-data-info',
          this.dataverseAlias,
        );
        console.log(loadDataverseResponse);
      } catch (e) {
        console.log(e);
        this.clientLoaded = false;
      }
    },
    async loadDataset() {
      console.log(1);
    },
  },
};
</script>
