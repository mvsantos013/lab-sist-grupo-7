import * as dataverseClient from '@/backend/singletons/dataverseClient';
const { ConfigModel } = require('/data');

export const saveDataverseClientConfig = async (
  event,
  host = null,
  apikey = null,
  dataverse = null,
) => {
  if (!host || !apikey || !dataverse) {
    throw new Error('Host, key and dataverse alias must be present');
  }

  let config = await ConfigModel.findByPk(1);

  if (!config) {
    await ConfigModel.create({
      values: {
        host,
        apikey,
        dataverse,
      },
    });
  } else {
    config.host = host;
    config.apikey = apikey;
    config.dataverse = dataverse;
    await config.save();
  }
};

export const loadDataverseClientFromSavedConfig = async () => {
  let config = await ConfigModel.findByPk(1);
  if (!config) {
    return null;
  } else {
    const { host, apikey, dataverse } = config;
    dataverseClient.load(host, apikey, dataverse);
    return { host, apikey, dataverse };
  }
};
