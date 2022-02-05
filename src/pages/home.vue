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
    <input
      v-model="dataverseAlias"
      type="text"
      class="border border-primary-500 rounded-sm px-1 w-full"
    />

    <button
      class="m-1 bg-primary-500 hover:bg-primary-700 text-sm text-white font-bold py-1 px-2 rounded ml-3"
      @click="loadDataVerseClient"
    >
      Carregar client
    </button>

    <h3>Dataverse Dataset Persistent ID</h3>

    <input
      v-model="datasetId"
      autofocus
      type="text"
      class="border border-primary-500 rounded-sm px-1 flex-grow"
    />

    <button
      class="m-1 bg-secondary-500 hover:bg-secondary-700 text-sm text-white font-bold py-1 px-2 rounded ml-3"
      @click="loadDataVerseDataInfo"
    >
      Carregar informação
    </button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  data() {
    return {
      url: 'https://dataverse.harvard.edu',
      apiKey: 'ed1a27d8-9362-4579-8d10-3355fb7823b6',
      datasetId: 'doi:10.7910/DVN/JCCOAT',
      dataverseAlias: 'lab-sist-info-grupo-7',
    }
  },
  mounted() {},
  methods: {
    loadDataVerseClient() {
      ipcRenderer
        .invoke('load-dataverse-client', this.url, this.apiKey)
        .then((result) => {
          console.log('ok')
        })
        .catch((err) => console.log(err))
    },
    loadDataVerseDataInfo() {
      ipcRenderer
        .invoke('load-dataverse-data-info', this.dataverseAlias)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => console.log(err))
    },
  },
}
</script>
