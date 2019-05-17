var User = require('./user');
var Book = require('./book');
var BorrowRequest = require('./borrow-request');
var ReturnRequest = require('./return-request');

// Admin constructor
function Admin(name, email, position) {
  User.call(this, name, email);
  this.position = position;
}

// Admin prototype should inherit from User prototype
Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

// Admin reads a user
Admin.prototype.readUser = function (userId) {
  return User.prototype.readUser(userId);
}

// Admin creates a book (buys a book and adds to the library database)
Admin.prototype.createBook = function (name, author, totalQuantity) {
  return Book.prototype.create(name, author, totalQuantity);
}
// Admin updates book properties by Id
Admin.prototype.updateBook = function (bookId, key, value) {
  return Book.prototype.update(bookId, key, value);
}

// Admin reads all books available in the database
Admin.prototype.readAllBooks = function () {
  return Book.prototype.readAll();
}
// Admin reads a book by Id
Admin.prototype.readABook = function (bookId) {
  return Book.prototype.read(bookId);
}

// Admin deletes a book by Id
Admin.prototype.deleteBook = function (bookId) {
  return Book.prototype.delete(bookId);
}

/* METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK */
// Admin reads all pending borrow requests
Admin.prototype.readBorrowRequests = function () {
  return BorrowRequest.read();
}

// Admin approves requests in pending requests array
Admin.prototype.approveBorrowRequests = function () {
  BorrowRequest.approve();
}

// Admin reads all pending return requests
Admin.prototype.readReturnRequests = function () {
  return ReturnRequest.read();
}
// Admin approves return and replaces a returned book in the library
Admin.prototype.approveReturnRequests = function () {
  return ReturnRequest.approve();
}

module.exports = Admin;