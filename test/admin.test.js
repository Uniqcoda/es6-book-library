let database = require('../app_methods/database');
let Admin = require('../app_methods/admin');

describe('test cases for creating an admin',
  function () {
    let moses = new Admin('Moses Adebayo', 'mosesm@gmail.com');
    moses.save();
    test('check for instance of Admin', function () {
      expect(moses instanceof Admin).toBeTruthy();
    });
  });