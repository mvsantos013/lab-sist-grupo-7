<template>
  <div class="main-container">
    <ClientLoader v-if="show === 'Loader'" />
    <Home v-if="show === 'Home'" />
    <Error
      v-if="show === 'Error'"
      v-bind:title="errorTitle"
      v-bind:text="errorText"
    />
    <ConfigDataverseClient v-if="show === 'Config'" v-on:config="onConfig" />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import ClientLoader from './ClientLoader';
import Home from './Home';
import Error from '@/frontend/pages/Error';
import ConfigDataverseClient from '@/frontend/pages/ConfigDataverseClient';
import { handleResponse } from '@/frontend/utils/handleResponse';

const showOptions = {
  Home: 'Home',
  Error: 'Error',
  Config: 'Config',
  Loader: 'Loader',
};

export default {
  components: { ConfigDataverseClient, Error, Home, ClientLoader },
  data() {
    return {
      show: showOptions.Loader,
      errorTitle: '',
      errorText: '',
    };
  },
  mounted() {
    this.loadDataVerse();
  },
  methods: {
    async loadDataVerse() {
      try {
        const loadClientResponse = await handleResponse(
          ipcRenderer.invoke('load-dataverse-client'),
        );
        if (loadClientResponse) {
          this.show = showOptions.Home;
        } else {
          this.show = showOptions.Config;
        }
      } catch (e) {
        this.errorTitle = e.message.toString();
        this.errorText = e.stack.toString();
        this.show = showOptions.Error;
      }
    },
    onConfig(result) {
      console.log('config', result);
    },
  },
};
</script>
