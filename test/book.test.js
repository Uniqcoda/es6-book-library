let database = require('../app_methods/database');
let Book = require('../app_methods/book');

describe('test cases for books', function () {
  let agriculture1 = new Book('Agriculture1', 'Mike Ogbonna', '10');
  test('checks for instance of Book', function () {
    expect(agriculture1 instanceof Book).toBeTruthy();
    expect(database.books[0]).toHaveProperty('name', 'Agriculture1');
  });
})