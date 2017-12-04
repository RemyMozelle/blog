const mysql = require('mysql');
const dotenv = require('dotenv').config({ path: '.env' })

const database = {
  getConnection(env) {
    if (env == 'JAWSDB_URL') {
      return mysql.createConnection(process.env.JAWSDB_URL);
    } else {
      return mysql.createConnection({
        host: 'localhost',
        database: 'blog',
        user: 'root',
        password: 'root'
      })
    }
  }
}

module.exports = database;