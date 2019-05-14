var database = require('./database');
var Book = require('./book');

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
  database.pendingRequests.sort(function (a, b) {
    return a.bookId - b.bookId;
  });
  // loop through the sorted array of books
  for (let i = 0; i < database.pendingRequests.length; i++) {
    // get the quantityAvailable of book requested, using the readABook property of the book
    var quantityAvalable = Book.readABook(database.pendingRequests[i].bookId).quantityAvalable;
    if (!quantityAvalable) { //if the book is not available
     database.pendingRequests[i].isApproved = 'Book is currently unavailable';
    }
  }
}
module.exports = PendingRequest;