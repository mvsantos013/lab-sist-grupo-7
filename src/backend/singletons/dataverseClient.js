import { DataverseClient } from 'js-dataverse';
import SingletonLoadError from '@/backend/errors/singletonLoadError';

let _client = null;
let _host = null;
let _apitoken = null;

const load = (host, apiToken) => {
  if (_client && host === _host && apiToken === _apitoken) {
    return _client;
  }
  _host = host;
  _apitoken = apiToken;
  _client = new DataverseClient(host, apiToken);
};
const get = () => {
  if (_client) {
    return _client;
  } else {
    throw new SingletonLoadError('Client not instantiated');
  }
};

export { load, get };
