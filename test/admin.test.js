let database = require('../app_methods/database');
let Admin = require('../app_methods/admin');

describe('test cases for Admin methods', function () {
  let moses = new Admin('Moses Adebayo', 'mosesm@gmail.com');
  moses.save();
  describe('test for creating an admin', function () {
    test('checks for instance of Admin', function () {
      expect(moses instanceof Admin).toBeTruthy();
    });
  });
  describe('test for admin creating a book', function () {
    moses.createBook('Physics1', 'David Mogbeyi', 5)
    test('checks that new book was created', function () {
      expect(database.books[0]).toHaveProperty('name', 'Physics1');
    })
  })
})