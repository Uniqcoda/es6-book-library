let database = require('../app_methods/database');
let User = require('../app_methods/user');

// Admin constructor
function Admin(name, email) {
  User.call(this, name, email);
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

// Admin creates a book (buys a book and adds to the library database)

// Admin updates book properties by Id
// Admin deletes book by Id
// Admin replaces a returned book
// Admin reads all books available in the database
// Admin reads a book by Id
// Admin reads pending borrow requests
module.exports = Admin;