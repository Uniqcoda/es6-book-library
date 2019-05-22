const User = require('./user');
const BorrowRequest = require('./borrow-request');
const ReturnRequest = require('./return-request');

// NonAdmin constructor for teachers and students
function NonAdmin(name, email, userType) {
  User.call(this, name, email);
  this.userType = userType;
  this.booksBorrowed = [];
}
// NonAdmin prototype should inherit from User prototype
NonAdmin.prototype = Object.create(User.prototype);
NonAdmin.prototype.constructor = NonAdmin;

/* METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK */

// Non-admin requests to borrow a book
NonAdmin.prototype.requestToBorrowBook = function (bookName, bookId) {
  BorrowRequest.prototype.create(bookName, bookId, userId = this.userId, userType = this.userType);
  return 'Request submitted!';
}
// Non-admin returns a book, (s)he won't be able to borrow more than 3 books at a time. This means that no user is allowed to hold more than 3 borrowed books
NonAdmin.prototype.requestToReturnBook = function (bookName, bookId) {
  ReturnRequest.prototype.create(bookName, bookId, userId = this.userId);
  return 'Request submitted!';
}
module.exports = NonAdmin;