<template>
  <h1 class="text-primary-500">Ocorreu um erro: {{ $route.params.title }}</h1>
  <p class="text-red-500">{{ $route.params.text }}</p>
  <button class="btn primary" @click="Reset">Tentar Novamente</button>
</template>

<script>
export default {
  name: 'Error',
  props: {
    text: String,
    title: String,
  },
  methods: {
    async Reset() {
      await this.$router.back();
    },
  },
};
</script>

<style scoped></style>
