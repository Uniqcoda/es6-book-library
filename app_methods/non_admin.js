var database = require('./database');
var User = require('./user');

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
NonAdmin.prototype.requestToBorrow = function (name, author) {
  // check if user has borrowed up to 3 books without returning any
  if (this.booksBorrowed.length > 2) {
    return 'You have exceeded the borrow limit per person!'
  }
  var request = {
    userId: this.userId,
    userType: this.userType,
    name: name,
    author: author,
    timeOfRequest: new Date(),
    requestId: database.pendingRequests.length ? database.pendingRequests[database.pendingRequests.length - 1].requestId + 1 : 1
  };
  // push request object to pendingRequest aaray
  database.pendingRequests.push(request);
  return 'Request submitted!';
}
// Non-admin returns a book
module.exports = NonAdmin;