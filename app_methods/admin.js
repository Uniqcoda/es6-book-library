var User = require('../app_methods/user');
var Book = require('../app_methods/book');
var BorrowRequest = require('./borrow_request');
var ReturnRequest = require('./return_request')

// Admin constructor
function Admin(name, email) {
  User.call(this, name, email);
}

// Admin prototype should inherit from User prototype
Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

// Admin reads a user
Admin.prototype.readUser = function (userId) {
  return User.prototype.readUser(userId)
}

// Admin creates a book (buys a book and adds to the library database)
Admin.prototype.createBook = function (name, author, totalQuantity) {
  return Book.createBook(name, author, totalQuantity);
}
// Admin updates book properties by Id
Admin.prototype.updateBook = function (bookId, key, value) {
  return Book.updateBook(bookId, key, value)
}

// Admin reads all books available in the database
Admin.prototype.readAllBooks = function () {
  return Book.readAllBooks();
}
// Admin reads a book by Id
Admin.prototype.readABook = function (bookId) {
  return Book.readABook(bookId);
}

// Admin deletes a book by Id
Admin.prototype.deleteBook = function (bookId) {
  return Book.deleteBook(bookId);
}

/* METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK */
// Admin reads all pending borrow requests
Admin.prototype.readBorrowRequests = function () {
  return BorrowRequest.readBorrowRequests();
}

// Admin approves requests in pending requests array
Admin.prototype.approveBorrowRequests = function () {
  BorrowRequest.approveBorrowRequests();
}

// Admin reads all pending return requests
Admin.prototype.readReturnRequests = function () {
  return ReturnRequest.readReturnRequests();
}
// Admin approves return and replaces a returned book in the library
Admin.prototype.approveReturnRequests = function () {
  return ReturnRequest.approveReturnRequests();
}

module.exports = Admin;