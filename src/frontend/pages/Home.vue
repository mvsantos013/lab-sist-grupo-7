<template>
  <div>HOME</div>

  <!--  <h3 class="mt-5">Dataverse Alias</h3>-->
  <!--  <div class="flex flex-nowrap items-center">-->
  <!--    <input v-model="dataverseAlias" type="text" class="input-text" />-->

  <!--    <button class="btn primary" @click="loadDataVerse">-->
  <!--      Carregar Dataverse-->
  <!--    </button>-->
  <!--    <button class="btn primary disabled" @click="loadDataVerse">-->
  <!--      Carregar Dataverse-->
  <!--    </button>-->
  <!--  </div>-->

  <!--  <h3 class="mt-5">Dataverse Dataset Persistent ID</h3>-->

  <!--  <div class="flex items-center">-->
  <!--    <input v-model="datasetId" autofocus type="text" class="input-text" />-->

  <!--    <button-->
  <!--      class="btn secondary"-->
  <!--      :class="{-->
  <!--        disabled: !clientLoaded,-->
  <!--      }"-->
  <!--      :disabled="clientLoaded"-->
  <!--      @click="loadDataset"-->
  <!--    >-->
  <!--      Carregar Dataset-->
  <!--    </button>-->
  <!--  </div>-->
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    datasetId: 'doi:10.7910/DVN/JCCOAT',
    dataverseAlias: 'lab-sist-info-grupo-7',
    clientLoaded: false,
  }),
};
</script>

<style scoped></style>
