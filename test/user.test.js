let database = require('../app_methods/database');
let User = require('../app_methods/user');
let Admin = require('../app_methods/admin')

describe('test for user methods', function () {
  let daniel = new User('Daniel Ephraim', 'danield@gmail.com');
  daniel.save();
  let cynthia = new User('Cynthia Ibrahim', 'cythiac@gmail.com')
  cynthia.save();
  let moses = new Admin('Moses Adebayo', 'mosesm@gmail.com');
  moses.save();

  describe('test cases for creating a user', function () {
    test('check for instance of User', function () {
      expect(daniel instanceof User).toBeTruthy();
      expect(cynthia instanceof User).toBeTruthy();
      expect(database.users.length).toBe(3);
    });
  });
  describe('test for user searching a book by name', function () {
    moses.createBook('Physics1', 'David Mogbeyi', 5);
    test('returns an object of the searched book', function () {
      expect(daniel.searchBook('Physics1')[0]).toHaveProperty('author', 'David Mogbeyi');
    })
  })
})

