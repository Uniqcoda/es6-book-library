var database = require('../app_methods/database');
var User = require('../app_methods/user');
var Admin = require('../app_methods/admin')

describe('test for user methods', function () {
  var daniel = new User('Daniel Ephraim', 'danield@gmail.com');
  daniel.save();
  var moses = new Admin('Moses Adebayo', 'mosesm@gmail.com');
  moses.save();
  var busayo = new NonAdmin('Busayo Onyeka', 'busayob@gmail.com', 'Teacher');
  busayo.save();
  var kingsley = new NonAdmin('Kingsley Olatunji', 'kingsleyk@gmail.com', 'Senior Student');
  kingsley.save();
  describe('test cases for creating a user', function () {
    test('check for instance of User', function () {
      expect(daniel instanceof User).toBeTruthy();
      expect(database.users[0]).toHaveProperty('name', 'Daniel Ephraim');
      expect(database.users.length).toBe(2);
    });
  });
  //test for searching user by name
  describe('test for searching a user by name', function () {
    test('returns an object of the searched user', function () {
      expect(moses.searchUser('Busayo')[0]).toHaveProperty('name', 'Busayo Onyeka')
    })
  })
  
  // test for reading user
  // test for updating user
  // test for deleting user

  describe('test for user searching a book by name', function () {
    moses.createBook('Physics1', 'David Mogbeyi', 5);
    moses.createBook('Agriculture1', 'Mike Ogbonna', 10);
    test('returns an object of the searched book', function () {
      expect(daniel.searchBook('Physics1')[0]).toHaveProperty('author', 'David Mogbeyi');
      expect(moses.searchBook('Physics2')).toBe('Invalid id');
    })
  })
})

