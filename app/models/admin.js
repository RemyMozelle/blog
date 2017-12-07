const db = require('../../config/database/database');
const expressValidator = require('express-validator');

const admin = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.getConnection().query('SELECT * FROM users WHERE roles=admin', (err, users) => {
        err ? reject(err) : resolve(users)
      });
    });
  },

  insertArticle() {
    req.checkBody('title', 'le prenom ne peut être vide').notEmpty()
    req.checkBody('content', 'l\'email ne peut être vide').notEmpty()

    const error = req.validationErrors();

    if (error) {
      res.render('../pages/register.ejs', {
        errors: error
      })
    } else {

      const data = {
        title: req.body.title,
        content: req.body.content
      }

      db.getConnection().query('INSERT INTO articles SET ?', data, (err, result) => {
        if (err) throw err
        const id = result.insertId
        db.getConnection().query(`SELECT id from articles where id=${id}`, (err, newArticle) => {
          req.login(newArticle, (err) => {
            if (err) throw err
            res.redirect('/dashboard')
          })
        })
      })
    }

  }

}

module.exports = admin;