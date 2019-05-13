let database = require('../app_methods/database');
let User = require('../app_methods/user');

// NonAdmin constructor
function NonAdmin(name, email, userType) {
  User.call(this, name, email);
  this.userType = userType;
  this.booksBorrowed = [];
}

NonAdmin.prototype = Object.create(User.prototype);
NonAdmin.prototype.constructor = NonAdmin;
module.exports = NonAdmin;