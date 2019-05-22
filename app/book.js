const database = require('./database');
const generateId = require('./id-generator');

// Book class
class Book {
  constructor(name, author, totalQuantity) {
    this.name = name;
    this.author = author;
    this.totalQuantity = totalQuantity;
    // use generateId function to generate bookId
    this.bookId = generateId(database.books, 'bookId');
    this.borrowersId = [];
    this.quantityAvailable = this.totalQuantity;
    database.books.push(this);
  }
}

// create a book method
Book.prototype.create = function (name, author, totalQuantity) {
  return new Book(name, author, totalQuantity);
}

// search a book method
Book.prototype.search = function (name) {
  // a regular expression to match any book with such a name
  let regex = new RegExp(name, 'g');
  // an array to store all matched books
  let booksWithName = [];
  for (let index = 0; index < database.books.length; index++) {
    if (regex.test(database.books[index].name)) {
      let bookName = database.books[index].name;
      let bookAuthor = database.books[index].author;
      let bookId = database.books[index].bookId;
      // the search result should contain only necessary information available to the public
      booksWithName.push({ name: bookName, author: bookAuthor, bookId: bookId });
    }
  }
  if (booksWithName.length) return booksWithName;
  return 'name not found';
}

// read a book method
Book.prototype.read = function (bookId) {
  for (let index = 0; index < database.books.length; index++) {
    if (database.books[index].bookId === bookId) {
      return database.books[index];
    }
  }
  return 'Invalid id';
}

// update a book method
Book.prototype.update = function (bookId, updateObject) {
  // if updateObject has name, author or totalQuantity property
  if (updateObject.name || updateObject.author || updateObject.totalQuantity) {
    let book = Book.prototype.read(bookId);
    if (book === 'Invalid id') return book;
    // update property from the updateObject parameter
    // update property with new value or keep old value
    // it is only the name, author and total quantity of books that can be updated this way
    book.name = updateObject.name || book.name;
    book.author = updateObject.author || book.author;
    book.totalQuantity = updateObject.totalQuantity || book.totalQuantity;
    // edit the quantity available to reflect the new total quantity
    book.quantityAvailable = book.totalQuantity - book.borrowersId.length
    return 'Update was successful';
  }
  return 'Invalid update parameter';
}

// delete a book method
Book.prototype.delete = function (bookId) {
  for (let index = 0; index < database.books.length; index++) {
    if (database.books[index].bookId === bookId) {
      // remove book from books array
      database.books.splice(index, 1);
      return 'Book successfully deleted';
    }
  }
  return 'Invalid id';
}

// read all books method
Book.prototype.readAll = function () {
  return database.books;
}
module.exports = Book;
