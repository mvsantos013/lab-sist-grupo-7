import * as fs from 'fs';
if (!fs.existsSync('src/data')) fs.mkdirSync('src/data');
import { ipcMain } from 'electron';
import databaseController from './controllers/databaseController';
import loadDataVerseClient from './controllers/loadDataVerseClient';
import { loadDataVerseDataInfo } from './controllers/loadDataVerseData';

ipcMain.handle('load-dataverse-client', loadDataVerseClient);
ipcMain.handle('load-dataverse-data-info', loadDataVerseDataInfo);
ipcMain.handle('db-get-config-values', databaseController.getConfigValues);
