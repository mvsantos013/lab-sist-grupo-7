<template>
  <router-link class="mt-4 btn primary" to="/">Ir para Home</router-link>
  <div class="py-5">
    <h1 class="text-4xl my-5">Upload - Escolher Arquivo</h1>
    <div class="line-card p-5 border-primary-500 border-2 rounded-xl">
      <h3 class="text-2xl">Atualizar Existente:</h3>
      <div>
        <ul>
          <li
            class="my-10 mx-5"
            v-for="dataset in datasetList"
            :key="dataset.id"
          >
            <div>
              <h3 class="text-xl">
                <span class="text-primary-500">Dataset Id:</span>
                <span>&nbsp;{{ dataset.id }}</span>
              </h3>
              <h4 class="text-md">
                <span class="text-primary-500">Nome do dataset:</span>
                <span>&nbsp;{{ dataset.name }}</span>
              </h4>
              Arquivos:
              <ul>
                <li class="m-2" v-for="file in dataset.files" :key="file.id">
                  <button class="btn small primary mr-4">Escolher</button>
                  <span class="font-bold">{{
                    file.dataFile.originalFileName
                  }}</span>
                  criado em
                  <span class="text-primary-500">{{
                    file.dataFile.creationDate
                  }}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mt-4">
      <div class="line-card p-5 border-primary-500 border-2 rounded-xl">
        <h3 class="text-2xl">Criar Novo:</h3>
        <div class="mt-2">
          <div>Dataset</div>
          <select class="input-text bg-white">
            <option selected>-----</option>
            <option
              v-for="dataset in datasetList"
              :value="dataset.id"
              :key="dataset.id"
            >
              {{ dataset.id }} - {{ dataset.name }}
            </option>
          </select>
        </div>
        <div class="mt-2">
          <div>Nome do Arquivo</div>
          <input v-model="newname" type="text" class="input-text" />
        </div>
        <div>
          <button class="btn secondary mt-4">Criar novo</button>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <div class="line-card p-5 border-primary-500 border-2 rounded-xl">
        <h3 class="text-2xl">Carregar do computador:</h3>
        <div class="mt-2">
          <input
            ref="file"
            class="input-file"
            type="file"
            @click="resetFile"
            @change="fileSelectedFromComputer"
          />
          <span class="ml-5">{{ selectedFile.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { handleResponse } from '@/frontend/utils/handleResponse';

const filterDatasets = (datasets) => {
  return datasets.map((dataset) => {
    const datasetName =
      dataset.latestVersion.metadataBlocks.citation.fields.find(
        (value) => value.typeName === 'title',
      ).value;
    return {
      id: dataset.id,
      files: dataset.latestVersion.files,
      persistenceUrl: dataset.persistenceUrl,
      name: datasetName,
    };
  });
};

export default {
  name: 'Upload',
  data() {
    return {
      datasetList: [],
      newname: '',
      selectedFile: {},
    };
  },
  inject: ['AppContext'],
  async mounted() {
    try {
      this.AppContext.showLoader = true;
      const datasetList = await handleResponse(
        ipcRenderer.invoke('list-datasets'),
      );
      this.AppContext.showLoader = false;
      this.datasetList = filterDatasets(datasetList);
    } catch (e) {
      this.AppContext.showLoader = false;
      await this.$router.push({
        name: `Error`,
        params: { title: e.message.toString(), text: e.stack.toString() },
      });
    }
  },
  methods: {
    resetFile() {
      this.$refs.file.value = '';
      this.selectedFile = {};
    },
    fileSelectedFromComputer() {
      this.selectedFile = this.$refs.file.files[0];
    },
  },
};
</script>

<style scoped></style>
