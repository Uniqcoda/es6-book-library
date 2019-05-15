var database = require('../app_methods/database');
var User = require('../app_methods/user');
var Book = require('../app_methods/book');
var BorrowRequest = require('./borrow_request');
let NonAdmin = require('./non_admin')

// Admin constructor
function Admin(name, email) {
  User.call(this, name, email);
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

// Admin reads a user
Admin.prototype.readUser = function (userId) {
  return User.readUser(userId)
}

// Admin creates a book (buys a book and adds to the library database)
Admin.prototype.createBook = function (name, author, totalQuantity) {
  return Book.createBook(name, author, totalQuantity);
}
// Admin updates book properties by Id
Admin.prototype.updateBook = function (bookId, updateDetails) {
  return Book.updateBook(bookId, updateDetails)
}

// Admin reads all books available in the database
Admin.prototype.readAllBooks = function () {
  return Book.readAllBooks();
}
// Admin reads a book by Id
Admin.prototype.readABook = function (bookId) {
  return Book.readABook(bookId);
}

// Admin deletes book by Id
Admin.prototype.deleteBook = function (bookId) {
  return Book.deleteBook(bookId);
}

/* METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK */

// Admin reads all pending borrow requests
Admin.prototype.readAllRequests = function () {
  return BorrowRequest.readAllRequests();
}

// Admin approves requests in pending requests array
Admin.prototype.approveRequests = function () {
  BorrowRequest.approveRequest()
}

// Admin replaces a returned book

module.exports = Admin;