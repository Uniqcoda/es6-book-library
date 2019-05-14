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
    var bookId = database.pendingRequests[i].bookId;
    var quantityAvalaible = Book.readABook(bookId).quantityAvalable;
    if (quantityAvalaible < 1) { //if the book is not available
     database.pendingRequests[i].isApproved = 'Book is currently unavailable';
     continue;
    }
    if (database.pendingRequests[i].userType === 'Teacher') { // if user is a teacher
      database.pendingRequests[i].isApproved = true;
      // update the book by reducing the quantity available by 1
      Book.updateBook(bookId, {quantityAvalable: this.quantityAvalaible - 1})
      continue
    }
  }
}
module.exports = PendingRequest;