<template>
  <h1 class="text-primary-500">Ocorreu um erro: {{ title }}</h1>
  <p class="text-red-500">{{ text }}</p>
</template>

<script>
export default {
  name: 'Error',
  props: {
    title: String,
    text: String,
  },
};
</script>

<style scoped></style>
