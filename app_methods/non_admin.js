var database = require('./database');
var User = require('./user');
var BorrowRequest =require('./borrow_request');
var ReturnRequest = require('./return_request');

// NonAdmin constructor
function NonAdmin(name, email, userType) {
  User.call(this, name, email);
  this.userType = userType;
  this.booksBorrowed = [];
}

NonAdmin.prototype = Object.create(User.prototype);
NonAdmin.prototype.constructor = NonAdmin;

/* METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK */

// Non-admin requests to borrow a book
NonAdmin.prototype.requestToBorrow = function (bookName, bookId) {
  BorrowRequest.makeRequest(bookName, bookId, userId = this.userId, userType = this.userType);
  return 'Request submitted!';
}
// Non-admin returns a book, (s)he won't be able to borrow more than 3 books at a time. This means that no user is allowed to hold more than 3 borrowed books
NonAdmin.prototype.requestToReturn = function (bookName, bookId) {
  ReturnRequest.makeRequest(bookName, bookId, userId = this.userId, userType = this.userType);
  return 'Request submitted!';
}
module.exports = NonAdmin;