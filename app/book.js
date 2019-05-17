var database = require('./database');
var generateId = require('./id-generator');

// Book constructor
function Book(name, author, totalQuantity) {
  this.name = name;
  this.author = author;
  this.totalQuantity = totalQuantity;
  // use generateId function to generate bookId
  this.bookId = generateId(database.books, 'bookId');
  this.borrowersId = [];
  this.quantityAvailable = this.totalQuantity;
  database.books.push(this);
}

// create a book method
Book.prototype.create = function (name, author, totalQuantity) {
  return new Book(name, author, totalQuantity);
}

// search a book method
Book.prototype.search = function (name) {
  // a regular expression to match any book with such a name
  var regex = new RegExp(name, 'g');
  // an array to store all matched books
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
  return 'name not found';
}

// update a book method
Book.prototype.update = function (bookId, updateObject) {
  // if updateObject has name, author or totalQuantity property
  if (updateObject.name || updateObject.author || updateObject.totalQuantity) { 
    for (var index = 0; index < database.books.length; index++) {
      if (database.books[index].bookId === bookId) {
        // update property from the updateObject parameter
        // update property with new value or keep old value
        // it is only the name, author and total quantity of books that can be updated this way
        database.books[index].name = updateObject.name || database.books[index].name;
        database.books[index].author = updateObject.author || database.books[index].author;
        database.books[index].totalQuantity = updateObject.totalQuantity || database.books[index].totalQuantity;
        // edit the quantity available to reflect the new total quantity
        database.books[index].quantityAvailable = database.books[index].totalQuantity - database.books[index].borrowersId.length
        return 'Update was successful';
      }
    }
    return 'Invalid id';
  }
  return 'Invalid update parameter';
}

// delete a book method
Book.prototype.delete = function (bookId) {
  for (var index = 0; index < database.books.length; index++) {
    if (database.books[index].bookId === bookId) {
      // remove book from books array
      database.books.splice(index, 1);
      return 'Book successfully deleted';
    }
  }
  return 'Invalid id';
}

// read a book method
Book.prototype.read = function (bookId) {
  for (var index = 0; index < database.books.length; index++) {
    if (database.books[index].bookId === bookId) {
      return database.books[index];
    }
  }
  return 'Invalid id';
}

// read all books method
Book.prototype.readAll = function () {
  return database.books;
}
module.exports = Book;