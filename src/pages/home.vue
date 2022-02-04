<template>
  <div class="p-3" style="max-width: 30rem">
    <h1 class="text-xl">Anonimizador</h1>

    <h3 class="mt-5">API Key</h3>
    <input
      v-model="apiKey"
      type="text"
      class="border border-primary-500 rounded-sm px-1 w-full"
    />

    <div class="mt-5">
      <h3>Dataverse Dataset Persistent ID</h3>
      <div class="flex flex-nowrap items-center">
        <input
          v-model="datasetId"
          autofocus
          type="text"
          class="border border-primary-500 rounded-sm px-1 flex-grow"
        />
        <button
          class="bg-primary-500 hover:bg-primary-700 text-sm text-white font-bold py-1 px-2 rounded ml-3"
          @click="loadDataset"
        >
          Carregar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { DataverseClient } from 'js-dataverse'

const API_PATH = 'https://dataverse.harvard.edu'

export default {
  data() {
    return {
      client: null,
      apiKey: 'ed1a27d8-9362-4579-8d10-3355fb7823b6',
      datasetId: 'doi:10.7910/DVN/JCCOAT',
    }
  },
  mounted() {
    this.client = new DataverseClient(API_PATH, this.apiKey)
  },
  methods: {
    loadDataset() {
      this.downloadDatasetFiles(this.datasetId)
    },
    async downloadDatasetFiles(id) {
      const response = await this.client.getDataverseInformation(
        'lab-sist-info-grupo-7',
      )
      console.log(response.status)
      console.log(response.data)

      const response2 = await this.client.getDatasetFiles(id)
      console.log(response2.status)
      console.log(response2.data)
    },
  },
}
</script>
