var database = require('./database');
var Book = require('./book');
var User = require('./user');

// Return request constructor
function ReturnRequest(bookName, bookId, userId) {
  this.userId = userId;
  this.bookName = bookName;
  this.bookId = bookId;
  //push this object to returnRequests array
  database.returnRequests.push(this);
}

// make a request to return book
ReturnRequest.create = function (bookName, bookId, userId) {
  return new ReturnRequest(bookName, bookId, userId);
};

// read all return requests
ReturnRequest.read = function () {
  return database.returnRequests;
}


// METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK
// approve return requests in database
ReturnRequest.approve = function () {
  // loop through the array of returnRequests
  for (var index = 0; index < database.returnRequests.length; index++) {
    // extract the bookId and userId from each return request
    var bookId = database.returnRequests[index].bookId;
    var bookName = database.returnRequests[index].bookName;
    var userId = database.returnRequests[index].userId;
    var user = User.prototype.readUser(userId);
    var book = Book.prototype.read(bookId);
    // check if book exists
    if (book === 'Invalid id') {
      return database.returnRequests[index].isApproved = 'Invalid book id';
    }
    // remove book from booksBorrowed array of user
      user.booksBorrowed.splice(user.booksBorrowed.indexOf(bookName), 1);
    // approve the return request
    database.returnRequests[index].isApproved = true;
    // remove userId from borrowersId of book
      book.borrowersId.splice(book.borrowersId.indexOf(userId), 1);
      // increase the quantity available of the book by 1
      book.quantityAvailable += 1;

  }
}
module.exports = ReturnRequest;