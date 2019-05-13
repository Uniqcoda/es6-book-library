let database = require('../app_methods/database')
let User = require('../app_methods/user')

describe('test cases for creating a user',
  function () {
    let daniel = new User('Daniel Ephraim', 'danield@gmail.com');
    let cynthia = new User('Cynthia Ibrahim', 'cythiac@gmail.com')
    test('check for instance of User', function () {
      expect(daniel instanceof User).toBeTruthy();
      expect(cynthia instanceof User).toBeTruthy();
      expect(database.users.length).toBe(2);
    });
  })
