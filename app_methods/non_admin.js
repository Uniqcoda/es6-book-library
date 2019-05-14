var database = require('./database');
var User = require('./user');

// NonAdmin constructor
function NonAdmin(name, email, userType) {
  User.call(this, name, email);
  this.userType = userType;
  this.booksBorrowed = [];
}

/* METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK */
// Non-admin requests to borrow a book
// Non-admin returns a book
NonAdmin.prototype = Object.create(User.prototype);
NonAdmin.prototype.constructor = NonAdmin;
module.exports = NonAdmin;