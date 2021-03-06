const mysql = require('mysql');
const dotenv = require('dotenv').config({ path: '.env' });

const db = {
  /**
   * 
   * @param {*} env 
   * si env = JAWSDB_URL
   * alors il recupère la valeur de la variable d'environement
   */
  getConnection(env) {
    if (env == 'JAWSDB_URL') {
      return mysql.createConnection(process.env.JAWSDB_URL);
    } else {
      return mysql.createPool({
        connectionLimit : 10,
        host: '127.0.0.1',
        database: 'blog',
        user: 'root',
        password: 'root'
      })
    }
  },

  getOption() {
    return options = {
      host: '127.0.0.1',
      port: '3306',
      password: 'root',
      user: 'root',
      database: 'blog',
    }
  }
}
module.exports = db;