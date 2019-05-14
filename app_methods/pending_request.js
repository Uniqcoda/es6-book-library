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
module.exports = PendingRequest;