var database = require('./database');
var Book = require('./book');
var User = require('./user')

function ReturnRequest(bookName, bookId, userId, userType) {
  this.userId = userId;
  this.userType = userType;
  this.bookName = bookName;
  this.bookId = bookId;
  //push this object to returnRequests array
  database.returnRequests.push(this);
}

ReturnRequest.makeRequest = function (bookName, bookId, userId, userType) {
  return new ReturnRequest(bookName, bookId, userId, userType);
};

ReturnRequest.readAllReturnRequests = function () {
  return database.returnRequests;
}

// METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK

ReturnRequest.approveReturn = function () {
  // loop through the sorted array of books
  for (var index = 0; index < database.returnRequests.length; index++) {
    // extract the bookId and userId from each pendingRequest
    var bookId = database.returnRequests[index].bookId;
    var userId = database.returnRequests[index].userId;
    var user = User.readUser(userId);
    var book = Book.readABook(bookId);
    // remove book from booksBorrowed array of user
    for (let i = 0; i < user.booksBorrowed.length; i++) {
      if (user.booksBorrowed[i] === bookId) {
        user.booksBorrowed.splice(i,1);
      }
    }
    // console.log(user);
    // remove userId from borrowersId of book
    for (let i = 0; i < book.borrowersId.length; i++) {
      book.borrowersId.splice(i,1);
    }
    // console.log(book);
    // approve the return request
    database.returnRequests[index].isApproved = true;
    // increase the quantity available of the book by 1
    book.quantityAvailable += 1;
  }
}
module.exports = ReturnRequest;