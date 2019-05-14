let database = require('../app_methods/database');
let Admin = require('../app_methods/admin');

describe('test cases for Admin methods', function () {
  let moses = new Admin('Moses Adebayo', 'mosesm@gmail.com');
  moses.save();
  let grace = new Admin('Grace Igbokwe', 'graceg@gmail.com');
  grace.save();
  moses.createBook('Physics1', 'David Mogbeyi', 5);
  grace.createBook('Agriculture1', 'Mike Ogbonna', 10);

  describe('test for creating an admin', function () {
    test('checks for instance of Admin', function () {
      expect(moses instanceof Admin).toBeTruthy();
      expect(database.users[0]).toHaveProperty('name', 'Moses Adebayo');
    });
  });
  describe('test for admin creating a book', function () {
    test('confirms that new book was created', function () {
      expect(database.books[0]).toHaveProperty('name', 'Physics1');
      expect(database.books[1]).toHaveProperty('name', 'Agriculture1');
    });
  })
  describe('test for admin updating a book by id', function () {
    test('confirms that book was updated', function () {
      moses.updateBook(1, { totalQuantity: 8 });
      expect(database.books[0]).toHaveProperty('totalQuantity', 8);
      expect(grace.updateBook(59, { totalQuantity: 2 })).toBe('Book not found');
    })
  });
  describe('test for admin reading a book by id', function () {
    test('returns a book by given id', function () {
      let result = grace.readABook(1);
      console.log(result);
      expect(result).toHaveProperty('quantityAvailable', 5);
      expect(grace.readABook(59)).toBe('Book not found');
    })
  })
})