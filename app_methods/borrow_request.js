var database = require('./database');
var Book = require('./book');
var User = require('./user')

function BorrowRequest(bookName, bookId, userId, userType) {
  this.userId = userId;
  this.userType = userType;
  this.bookName = bookName;
  this.bookId = bookId;
  this.timeOfRequest = new Date();
  //this.requestId = database.borrowRequests.length ? database.borrowRequests[database.borrowRequests.length - 1].requestId + 1 : 1;
  //push request object to pendingRequest array
  database.borrowRequests.push(this);
}


BorrowRequest.makeRequest = function (bookName, bookId, userId, userType) {
  return new BorrowRequest(bookName, bookId, userId, userType);
};

BorrowRequest.readAllRequests = function () {
  return database.borrowRequests;
}

BorrowRequest.approveRequest = function () {
  // sort array by user type
  var obj = { Teacher: 1, 'Senior Student': 2, 'Junior Student': 3 }
  database.borrowRequests.sort(function (a, b) {
    return obj[a.userType] - obj[b.userType];
  });
  // loop through the sorted array of books
  for (var index = 0; index < database.borrowRequests.length; index++) {
    // extract the bookId and userId from each pendingRequest
    var bookId = database.borrowRequests[index].bookId;
    var userId = database.borrowRequests[index].userId;
    var user = User.readUser(userId);
    var book = Book.readABook(bookId);
    if (book.quantityAvailable < 1) { //if the book is not available
      database.borrowRequests[index].isApproved = 'Book is currently unavailable';
      continue;
    }
    database.borrowRequests[index].isApproved = true;
    book.borrowersId.push(database.borrowRequests[index].userId);
    console.log(book);
    // add book to booksBorrowed array of user
    user.booksBorrowed.push(database.borrowRequests[index].bookName);
    book.quantityAvailable -= 1;
  }
}
module.exports = BorrowRequest;