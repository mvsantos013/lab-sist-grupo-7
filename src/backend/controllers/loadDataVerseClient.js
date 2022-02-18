import * as fs from 'fs/promises';
import * as path from 'path';
import * as dataverseClient from '@/backend/singletons/dataverseClient';

const dataverseClientInfoPath = 'src/data/dataVerseClientInfo.json';

const loadDataVerseClient = async (event, host = null, apiKey = null) => {
  let data;
  if (host && apiKey) {
    data = { host, apiKey };
    await fs.writeFile(
      path.resolve(dataverseClientInfoPath),
      JSON.stringify(data),
    );
  } else {
    data = JSON.parse(
      String(await fs.open(path.resolve(dataverseClientInfoPath), 'r')),
    );
  }
  console.log('dataverseclient info:', data);
  dataverseClient.load(data.host, data.apiKey);
};

export default loadDataVerseClient;
