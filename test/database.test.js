var database = require('../app_methods/database');
var Admin = require('../app_methods/admin');
var Book = require('../app_methods/book');
var User = require('../app_methods/user');
var NonAdmin = require('../app_methods/non_admin');


describe('test for database', function () {
  var daniel = new User('Daniel Ephraim', 'danield@gmail.com');
  daniel.save();
  var moses = new Admin('Moses Adebayo', 'mosesm@gmail.com');
  moses.save();
  var busayo = new NonAdmin('Busayo Onyeka', 'busayob@gmail.com', 'Teacher');
  busayo.save();
  moses.createBook('Physics1', 'David Mogbeyi', 5);
  moses.createBook('Agriculture1', 'Mike Ogbonna', 10);
  describe('test for creating an admin', function () {
    test('', function () {
      expect(moses instanceof Admin).toBeTruthy();
    })
  })
  describe('test for creating a non-admin', function () {
    test('', function () {
      expect(busayo instanceof NonAdmin).toBeTruthy();
    })
  })
  describe('test for creating a book', function () {
    expect(database.books[0]).toHaveProperty('name', 'Physics1')
  })
  describe('test for creating a user', function () {
    test('', function () {
      expect(daniel instanceof User).toBeTruthy();
    })
  })
})