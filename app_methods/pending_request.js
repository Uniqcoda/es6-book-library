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
  for (var i = 0; i < database.pendingRequests.length; i++) {
    // get the quantityAvailable of book requested, using the readABook property of the book
    var bookId = database.pendingRequests[i].bookId;
    var quantityAvailable = Book.readABook(bookId).quantityAvailable;
    if (quantityAvailable < 1) { //if the book is not available
      database.pendingRequests[i].isApproved = 'Book is currently unavailable';
      continue;
    }
    if (database.pendingRequests[i].userType === 'Teacher') { // if user is a teacher
      database.pendingRequests[i].isApproved = true;
      // add userId to the borrowers array of the book
    for (var j = 0; j < database.books.length; j++) {
      if (database.books[j].bookId === bookId) { 
        database.books[j].borrowers += 1;
        database.books[j].quantityAvailable -= 1;
      }
    }
      continue
    }

  }
}
module.exports = PendingRequest;