let database = require('../app_methods/database');
let Admin = require('../app_methods/admin');
let Book = require('../app_methods/book');
let User = require('../app_methods/user');
let NonAdmin = require('../app_methods/non_admin');


describe('test for database', function () {
  let daniel = new User('Daniel Ephraim', 'danield@gmail.com');
  daniel.save();
  let moses = new Admin('Moses Adebayo', 'mosesm@gmail.com');
  moses.save();
  let busayo = new NonAdmin('Busayo Onyeka', 'busayob@gmail.com', 'Teacher');
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
console.log(database);

})