var database = require('./database');
var generateId = require('./id_generator')

// Book constructor
function Book(name, author, totalQuantity) {
  this.name = name;
  this.author = author;
  this.totalQuantity = totalQuantity;
  // the book Id will be autogenerated and will increment based on the Id of the most recent book in the database
  this.bookId = generateId(database.books, 'bookId')
  this.borrowersId = [];
  this.quantityAvailable = this.totalQuantity;
  database.books.push(this);
}

// create a book method
Book.createBook = function (name, author, totalQuantity) {
  return new Book(name, author, totalQuantity);
}

// search a book method
Book.searchBook = function (name) {
  var regex = new RegExp(name, 'g')
  var booksWithName = [];
  for (var index = 0; index < database.books.length; index++) {
    if (regex.test(database.books[index].name)) {
      var bookName = database.books[index].name;
      var bookAuthor = database.books[index].author;
      var bookId = database.books[index].bookId;
      booksWithName.push({ name: bookName, author: bookAuthor, bookId: bookId });
    }
  }
  if (booksWithName.length) return booksWithName;
  return 'Invalid id';
}

// update a book method
Book.updateBook = function (bookId, updateDetails) {
  for (var index = 0; index < database.books.length; index++) {
    if (database.books[index].bookId === bookId) {
      return Object.assign(database.books[index], updateDetails);
    }
  }
  return 'Invalid id';
}

// delete a book method
Book.deleteBook = function (bookId) {
  for (var index = 0; index < database.books.length; index++) {
    if (database.books[index].bookId === bookId) {
      database.books.splice(index, 1);
      return 'Book successfully deleted'
    }
  }
  return 'Invalid id';
}

// read a book method
Book.readABook = function (bookId) {
  for (var index = 0; index < database.books.length; index++) {
    if (database.books[index].bookId === bookId) {
      return database.books[index];
    }
  }
  return 'Invalid id';
}

// read all books method
Book.readAllBooks = function () {
  return database.books;
}
module.exports = Book;