var database = require('./database');
var Book = require('./book');
var generateId = require('./id_generator')

// user constructor function
function User(name, email) {
  this.name = name;
  this.email = email;
  // the user Id will be autogenerated and will increment based on the Id of the most recent user in the database
  this.userId = generateId(database.users, 'userId')
}
// save user to database
User.prototype.save = function () {
  database.users.push(this);
};

// User searches for a book by name
User.prototype.searchBook = function (name) {
  return Book.searchBook(name);
}

// read a user by id method
User.prototype.readUser = function (userId) {
  for (var index = 0; index < database.users.length; index++) {
    // loop through the users array and find the user with the id
    if (database.users[index].userId === userId) {
      return database.users[index];
    }
  }
  return 'Invalid id';
}

module.exports = User;