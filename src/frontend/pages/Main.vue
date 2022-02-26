<template>
  <ClientLoader v-if="AppContext.showLoader" />
  <div class="main-container">
    <router-view />
  </div>
</template>

<script>
import ClientLoader from '../components/ClientLoader';

export default {
  components: { ClientLoader },
  inject: ['AppContext'],
};
</script>
