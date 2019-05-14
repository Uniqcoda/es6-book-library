var database = require('../app_methods/database');
var NonAdmin = require('../app_methods/non_admin');

describe('test cases for creating a non-admin',
  function () {
    var busayo = new NonAdmin('Busayo Onyeka', 'busayob@gmail.com', 'Teacher');
    busayo.save();
    test('check for instance of NonAdmin', function () {
      expect(busayo instanceof NonAdmin).toBeTruthy();
    });
  });  