import { DataverseClient } from 'js-dataverse';
import SingletonLoadError from '@/backend/errors/singletonLoadError';

let client = null;

const load = (host, apiToken) => {
  client = new DataverseClient(host, apiToken);
};
const get = () => {
  if (client) {
    return client;
  } else {
    throw new SingletonLoadError('Client not instantiated');
  }
};

export { load, get };
