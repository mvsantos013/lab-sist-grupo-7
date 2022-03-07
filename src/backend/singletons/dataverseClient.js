import { DataverseClient } from 'js-dataverse';
import SingletonLoadError from '@/backend/errors/singletonLoadError';

class DVClient extends DataverseClient {
  constructor(host, apitoken, dataverse) {
    super(host, apitoken);
    this.dataverse = dataverse;
  }
  listDatasets() {
    return super.listDatasets(this.dataverse);
  }
  addDataset(payload) {
    return super.addDataset(this.dataverse, payload);
  }
  getDataverseInformation() {
    return super.getDataverseInformation(this.dataverse);
  }
}

let _client = null;
let _host = null;
let _apitoken = null;

const load = (host, apiToken, dataverse) => {
  if (_client && host === _host && apiToken === _apitoken) {
    return _client;
  }
  _host = host;
  _apitoken = apiToken;
  _client = new DVClient(host, apiToken, dataverse);
};
const get = () => {
  if (_client) {
    return _client;
  } else {
    throw new SingletonLoadError('Client not instantiated');
  }
};

export { load, get };
