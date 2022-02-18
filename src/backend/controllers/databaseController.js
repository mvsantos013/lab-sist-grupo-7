import * as fs from 'fs/promises';
import * as path from 'path';
import DatabaseClient from '@/backend/singletons/databaseClient';

export default {
  async getConfigValues() {
    const res = await DatabaseClient.query('select * from config');
    console.log(res);
  },
};
