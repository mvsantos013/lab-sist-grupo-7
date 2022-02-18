const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/data/database.db',
});

export class DatabaseClient {
  constructor() {
    this.db = new sqlite3.Database('src/data/database.db', sqlite3.OPEN_CREATE);
    this.createConfigTable();
  }

  get() {
    return this.db;
  }

  async query(sql) {
    return await this.db.run(sql);
  }

  createConfigTable() {
    this.db.run(`CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`);
  }
}

const dbClient = new DatabaseClient();

export default dbClient;
