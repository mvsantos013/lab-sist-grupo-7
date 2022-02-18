import { ipcMain } from 'electron';
import loadDataVerseClient from './controllers/loadDataVerseClient';
import { loadDataVerseDataInfo } from './controllers/loadDataVerseData';

ipcMain.handle('load-dataverse-client', loadDataVerseClient);
ipcMain.handle('load-dataverse-data-info', loadDataVerseDataInfo);
