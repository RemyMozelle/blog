const users = require('../models/users');

const usersController = {
  getAllUsers() {
    users.getAll().then(users => {
      console.log(users)
    }).catch(err => { console.log(err, ' une erreur sur UsersController') })
  }
}

module.exports = usersController;