var database = require('./database');
var Book = require('./book');
var User = require('./user')

function BorrowRequest(bookName, bookId, userId, userType) {
  this.userId = userId;
  this.userType = userType;
  this.bookName = bookName;
  this.bookId = bookId;
  //push this object to pendingRequest array
  database.borrowRequests.push(this);
}


BorrowRequest.makeRequest = function (bookName, bookId, userId, userType) {
  return new BorrowRequest(bookName, bookId, userId, userType);
};

BorrowRequest.readAllRequests = function () {
  return database.borrowRequests;
}

// METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK

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
    // confirm that user is not requesting to borrow a more than once
    if (user.booksBorrowed.indexOf(book.name) > -1) {
      database.borrowRequests[index].isApproved = 'You have already borrowed this book!';
      continue;
    }

    // check if user has borrowed up to 3 books without returning any
    if (user.booksBorrowed.length > 2) {
      database.borrowRequests[index].isApproved = 'You have exceeded the borrow limit per person!';
      continue;
    }
    //if the book is not available
    if (book.quantityAvailable < 1) {
      database.borrowRequests[index].isApproved = 'Book is currently unavailable';
      continue;
    }
    // reduce the quantity available of the book by 1
    book.quantityAvailable -= 1;
    // approvee the borrow request
    database.borrowRequests[index].isApproved = true;
    // add userId to borrowersId of book
    book.borrowersId.push(database.borrowRequests[index].userId);
    console.log(book);
    // add book to booksBorrowed array of user
    user.booksBorrowed.push(database.borrowRequests[index].bookName);
    console.log(user);
  }
}
module.exports = BorrowRequest;