let database = require('../app_methods/database');
let User = require('../app_methods/user');

// Admin constructor
function Admin(name, email) {
  User.call(this, name, email);
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;
module.exports = Admin;