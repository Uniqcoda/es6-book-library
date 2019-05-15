var database = require('../app_methods/database');
var Book = require('../app_methods/book');

describe('test cases for books', function () {
  var agriculture1 = new Book('Agriculture1', 'Mike Ogbonna', 10);
  var physics1 = new Book('Physics1', 'David Mogbeyi', 5)
  test('checks for instance of Book', function () {
    expect(agriculture1 instanceof Book).toBeTruthy();
    expect(database.books[0]).toHaveProperty('name', 'Agriculture1');
    expect(database.books[1]).toHaveProperty('name', 'Physics1');
  });
});
