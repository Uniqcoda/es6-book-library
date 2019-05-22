const database = require('./database');
const Book = require('./book');
const generateId = require('./id-generator');

// user class
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    // use generateId function to generate userId
    this.userId = generateId(database.users, 'userId');
  }
}

// save user to database
User.prototype.save = function () {
  database.users.push(this);
};

// search a user method
User.prototype.searchUser = function (name) {
    // a regular expression to match any user with such a name
  let regex = new RegExp(name, 'g');
    // an array to store all matched users
  let usersWithName = [];
  for (let index = 0; index < database.users.length; index++) {
    if (regex.test(database.users[index].name)) {
      usersWithName.push({ name: database.users[index].name });
    }
  }
  if (usersWithName.length) return usersWithName;
  return 'name not found';
}

// User updates his/her properties
User.prototype.updateUser = function (updateObject) {
  if (updateObject.email) { // if updateObject has email property
      // update property from the updateObject parameter
  this.email = updateObject.email;
  return 'Update was successful';
  }
  return 'Invalid update parameter';
}

// read a user by id method
User.prototype.readUser = function (userId) {
  for (let index = 0; index < database.users.length; index++) {
    // loop through the users array and find the user with the id
    if (database.users[index].userId === userId) {
      return database.users[index];
    }
  }
  return 'Invalid id';
}

// user deletes account
User.prototype.delete = function () {
  for (let i = 0; i < database.users.length; i++) {
    if (database.users[i].userId === this.userId) {
      database.users.splice(i, 1);
      return 'Account successfully deleted';
    }
  }
}

// User searches for book by name
User.prototype.searchBook = function (name) {
  return Book.prototype.search(name);
}


module.exports = User;
