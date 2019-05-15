var database = require('./database');
var Book = require('./book');
var User = require('./user')

// Return request constructor
function ReturnRequest(bookName, bookId, userId, userType) {
  this.userId = userId;
  this.userType = userType;
  this.bookName = bookName;
  this.bookId = bookId;
  //push this object to returnRequests array
  database.returnRequests.push(this);
}

// make a request to return book
ReturnRequest.makeRequest = function (bookName, bookId, userId, userType) {
  return new ReturnRequest(bookName, bookId, userId, userType);
};

// read all return requests
ReturnRequest.readAllReturnRequests = function () {
  return database.returnRequests;
}

// METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK
// approve return requests in database
ReturnRequest.approveReturn = function () {
  // loop through the sorted array of books
  for (var index = 0; index < database.returnRequests.length; index++) {
    // extract the bookId and userId from each pendingRequest
    var bookId = database.returnRequests[index].bookId;
    var bookName = database.returnRequests[index].bookName;
    var userId = database.returnRequests[index].userId;
    var user = User.prototype.readUser(userId);
    var book = Book.readABook(bookId);
    // remove book from booksBorrowed array of user
    for (let i = 0; i < user.booksBorrowed.length; i++) {
      if (user.booksBorrowed[i] === bookName) {
        return user.booksBorrowed.splice(i, 1);
      }
    }
    // console.log(user);
    // remove userId from borrowersId of book
    for (let i = 0; i < book.borrowersId.length; i++) {
      if (book.borrowersId[i] === userId) {
        return book.borrowersId.splice(i, 1);
      }
    }
    // console.log(book);
    // approve the return request
    database.returnRequests[index].isApproved = true;
    // increase the quantity available of the book by 1
    book.quantityAvailable += 1;
  }
}
module.exports = ReturnRequest;