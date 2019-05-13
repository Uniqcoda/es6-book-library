let database = require('./database');
let User = require('./user');

// NonAdmin constructor
function NonAdmin(name, email, userType) {
  User.call(this, name, email);
  this.userType = userType;
  this.booksBorrowed = [];
}

// Non-admin requests to borrow a book
// Non-admin returns a book
NonAdmin.prototype = Object.create(User.prototype);
NonAdmin.prototype.constructor = NonAdmin;
module.exports = NonAdmin;