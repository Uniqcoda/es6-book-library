var database = require('./database');
var User = require('./user');
var BorrowRequest =require('./borrow_request')

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
  // check if user has borrowed up to 3 books without returning any
  if (this.booksBorrowed.length > 2) {
    return 'You have exceeded the borrow limit per person!'
  }
  BorrowRequest.makeRequest(bookName, bookId, userId = this.userId, userType = this.userType);
  return 'Request submitted!';
}
// Non-admin returns a book
module.exports = NonAdmin;