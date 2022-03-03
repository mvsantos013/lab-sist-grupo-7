import * as fs from 'fs';
if (!fs.existsSync('src/data')) fs.mkdirSync('src/data');
import { ipcMain } from 'electron';
import databaseController from './controllers/databaseController';
import {
  loadDataverseClientFromSavedConfig,
  saveDataverseClientConfig,
} from './controllers/DataVerseClient';
import { loadDataVerseDataInfo } from './controllers/loadDataVerseData';
import handle from '@/backend/handler';

ipcMain.handle('db-get-config-values', databaseController.getConfigValues);

ipcMain.handle(
  'save-dataverse-client-config',
  handle.bind(saveDataverseClientConfig),
);

ipcMain.handle(
  'load-dataverse-client',
  handle.bind(loadDataverseClientFromSavedConfig),
);

ipcMain.handle('load-dataverse-data-info', handle.bind(loadDataVerseDataInfo));
