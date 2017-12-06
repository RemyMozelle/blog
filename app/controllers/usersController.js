const users = require('../models/users');

const usersController = {
  getAllUsers() {
    users.getAll().then(users => {
    }).catch(err => { console.log(err, ' une erreur sur UsersController') })
  }
}

module.exports = usersController;