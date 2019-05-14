var database = require('./database');
var Book = require('./book');
var User = require('./user')

function PendingRequest(bookName, bookId, userId, userType) {
  this.userId = userId;
  this.userType = userType;
  this.bookName = bookName;
  this.bookId = bookId;
  this.timeOfRequest = new Date();
  //this.requestId = database.pendingRequests.length ? database.pendingRequests[database.pendingRequests.length - 1].requestId + 1 : 1;
  //push request object to pendingRequest array
  database.pendingRequests.push(this);
}


PendingRequest.makeRequest = function (bookName, bookId, userId, userType) {
  return new PendingRequest(bookName, bookId, userId, userType);
};

PendingRequest.readAllRequests = function () {
  return database.pendingRequests;
}

PendingRequest.approveRequest = function () {
  // sort array by user type
  var obj = { Teacher: 1, 'Senior Student': 2, 'Junior Student': 3 }
  database.pendingRequests.sort(function (a, b) {
    return obj[a.userType] - obj[b.userType];
  });
  // loop through the sorted array of books
  for (var index = 0; index < database.pendingRequests.length; index++) {
    // extract the bookId and userId from each pendingRequest
    var bookId = database.pendingRequests[index].bookId;
    var userId = database.pendingRequests[index].userId;
    var user = User.readUser(userId);
    var book = Book.readABook(bookId);
    if (book.quantityAvailable < 1) { //if the book is not available
      database.pendingRequests[index].isApproved = 'Book is currently unavailable';
      continue;
    }
    database.pendingRequests[index].isApproved = true;
    book.borrowersId.push(database.pendingRequests[index].userId);
    console.log(book);
    // add book to booksBorrowed array of user
    user.booksBorrowed.push(database.pendingRequests[index].bookName);
    book.quantityAvailable -= 1;
  }
}
module.exports = PendingRequest;