import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import * as dataverseClient from '@/backend/singletons/dataverseClient';

const dataverseClientInfoDir = 'src/data/';
const ConfigModel = require('../sequelize/models/config');

export const saveDataverseClientConfig = async (
  event,
  host = null,
  apiKey = null,
) => {
  const filePath = path.resolve(
    dataverseClientInfoDir + dataverseClientInfoFile,
  );
  const dirPath = path.resolve(dataverseClientInfoDir);
  if (!host || !apiKey) {
    throw new Error('Host and key must be present');
  }

  if (fs.existsSync(filePath)) {
    await fsPromises.unlink(filePath);
  }
  if (!fs.existsSync(dirPath)) {
    await fsPromises.mkdir(dirPath);
  }

  const data = { host, apiKey };
  await fsPromises.writeFile(filePath, JSON.stringify(data));
};

export const loadDataverseClientFromSavedConfig = async () => {
  const pathString = dataverseClientInfoDir + dataverseClientInfoFile;
  const filePath = path.resolve(pathString);
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const contentString = String(await fsPromises.readFile(filePath));
  const data = JSON.parse(contentString);
  dataverseClient.load(data.host, data.apiKey);
  return true;
};
