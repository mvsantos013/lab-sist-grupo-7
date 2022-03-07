import * as dataverseClient from '@/backend/singletons/dataverseClient';
const { ConfigModel } = require('/data');

export const saveDataverseClientConfig = async (
  event,
  host = null,
  apikey = null,
) => {
  if (!host || !apikey) {
    throw new Error('Host and key must be present');
  }

  let config = await ConfigModel.findByPk(1);

  if (!config) {
    await ConfigModel.create({
      values: {
        host,
        apikey,
      },
    });
  } else {
    config.host = host;
    config.apikey = apikey;
    await config.save();
  }
};

export const loadDataverseClientFromSavedConfig = async () => {
  let config = await ConfigModel.findByPk(1);
  if (!config) {
    return null;
  } else {
    const { host, apikey } = config;
    dataverseClient.load(host, apikey);
    return { host, apikey };
  }
};
