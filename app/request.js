// Return request constructor
function Request(bookName, bookId, userId) {
  this.userId = userId;
  this.bookName = bookName;
  this.bookId = bookId;
  // do not push the request into an array yet 
  // since a request can be  in any of two arrays, based on it's purpose
}

module.exports = Request;