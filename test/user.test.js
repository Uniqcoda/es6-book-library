let database = require('../app/database');
let User = require('../app/user');
let Admin = require('../app/admin');
let NonAdmin = require('../app/non-admin');


describe('test for user methods', function () {
  let daniel = new User('Daniel Ephraim', 'danield@gmail.com');
  daniel.save();
  let moses = new Admin('Moses Adebayo', 'mosesm@gmail.com');
  moses.save();
  let busayo = new NonAdmin('Busayo Onyeka', 'busayob@gmail.com', 'Teacher');
  busayo.save();
  let kingsley = new NonAdmin('Kingsley Olatunji', 'kingsleyk@gmail.com', 'Senior Student');
  kingsley.save();
  describe('test cases for creating a user', function () {
    test('check for instance of User', function () {
      expect(daniel instanceof User).toBeTruthy();
      expect(database.users[0]).toHaveProperty('name', 'Daniel Ephraim');
      expect(database.users.length).toBe(4);
    });
  });
  describe('test for searching a user by name', function () {
    test('returns an array of the searched user result', function () {
      let result = moses.searchUser('Busayo');
      expect(result[0]).toHaveProperty('name', 'Busayo Onyeka');
      expect(busayo.searchUser('Tolu')).toBe('name not found');
    })
  })

  describe('test for updating user', function () {
    test('updates user properties', function () {
      busayo.updateUser({ 'email': 'bossbaby@gmail.com' });
      expect(database.users[2]).toHaveProperty('email', 'bossbaby@gmail.com');
      expect(busayo.updateUser('email')).toBe('Invalid update parameter');
    })
  })
  describe('test for admin deleting a user', function () {
    test('user deletes his account', function () {
      busayo.delete();
      expect(database.users[3]).toBeFalsy();
    })
  })

  describe('test for user searching a book by name', function () {
    moses.createBook('Physics1', 'David Mogbeyi', 5);
    moses.createBook('Agriculture1', 'Mike Ogbonna', 10);
    test('returns an array of the searched book result', function () {
      expect(daniel.searchBook('Physics1')[0]).toHaveProperty('author', 'David Mogbeyi');
      expect(moses.searchBook('Physics2')).toBe('name not found');
    })
  })
})

