var database = require('../app_methods/database');
var Admin = require('../app_methods/admin');
var NonAdmin = require('../app_methods/non_admin');

describe('test for non-admin methods', function () {
  var busayo = new NonAdmin('Busayo Onyeka', 'busayob@gmail.com', 'Teacher');
  busayo.save();
  var grace = new Admin('Grace Igbokwe', 'graceg@gmail.com');
  grace.save();
  grace.createBook('Physics1', 'David Mogbeyi', 5);
  grace.createBook('Agriculture1', 'Mike Ogbonna', 10);

  describe('test cases for creating a non-admin', function () {
    test('check for instance of NonAdmin', function () {
      expect(busayo instanceof NonAdmin).toBeTruthy();
      expect(database.users[0]).toHaveProperty('name', 'Busayo Onyeka')
    });
  });

  // TEST FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK

})
