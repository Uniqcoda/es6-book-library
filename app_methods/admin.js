let database = require('../app_methods/database');
let User = require('../app_methods/user');
let Book = require('../app_methods/book');

// Admin constructor
function Admin(name, email) {
  User.call(this, name, email);
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

// Admin creates a book (buys a book and adds to the library database)
Admin.prototype.createBook = function (name, author, totalQuantity) {
  return Book.createBook(name, author, totalQuantity);
}
// Admin updates book properties by Id
Admin.prototype.updateBook = function (bookId, updateDetails) {
  return Book.updateBook(bookId, updateDetails)
}

// Admin replaces a returned book

// Admin reads all books available in the database
Admin.prototype.readAllBooks = function () {
  return Book.readAllBooks();
}
// Admin reads a book by Id
Admin.prototype.readABook = function (bookId) {
  return Book.readABook(bookId);
}
// Admin reads pending borrow requests

// Admin deletes book by Id
module.exports = Admin;