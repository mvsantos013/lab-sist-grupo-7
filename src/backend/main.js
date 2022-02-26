import { ipcMain } from 'electron';
import {
  loadDataverseClientFromSavedConfig,
  saveDataverseClientConfig,
} from './controllers/DataVerseClient';
import { loadDataVerseDataInfo } from './controllers/loadDataVerseData';
import handle from '@/backend/handler';

ipcMain.handle(
  'save-dataverse-client-config',
  handle.bind(saveDataverseClientConfig),
);

ipcMain.handle(
  'load-dataverse-client',
  handle.bind(loadDataverseClientFromSavedConfig),
);

ipcMain.handle('load-dataverse-data-info', handle.bind(loadDataVerseDataInfo));
