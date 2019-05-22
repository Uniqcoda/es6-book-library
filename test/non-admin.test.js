const database = require('../app/database');
const Admin = require('../app/admin');
const NonAdmin = require('../app/non-admin');

describe('test for non-admin methods', function () {
  let busayo = new NonAdmin('Busayo Onyeka', 'busayob@gmail.com', 'Teacher');
  busayo.save();
  let kingsley = new NonAdmin('Kingsley Olatunji', 'kingsleyk@gmail.com', 'Senior Student');
  kingsley.save();
  let austin = new NonAdmin('Austin Sharibu', 'austina@gmail.com', 'Junior Student');
  austin.save();
  let grace = new Admin('Grace Igbokwe', 'graceg@gmail.com');
  grace.save();
  grace.createBook('Physics1', 'David Mogbeyi', 2);
  grace.createBook('Agriculture1', 'Mike Ogbonna', 10);

  describe('test cases for creating a non-admin', function () {
    test('check for instance of NonAdmin', function () {
      expect(busayo instanceof NonAdmin).toBeTruthy();
      expect(database.users[0]).toHaveProperty('name', 'Busayo Onyeka');
    });
  });
  // TEST FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK
  describe('test case for non-admin requesting to borrow a book', function () {
    let result = busayo.requestToBorrowBook('Physics1', 1);
    test('adds a request to the borrowRequests array', function () {
      // confirm that the request was added to the borrowRequests array
      expect(database.borrowRequests.length).toBe(1);
      expect(database.borrowRequests[0]).toHaveProperty('userId', 1);
      // check if confirmation statement is returned
      expect(result).toBe('Request submitted!');
    })
  })
  describe('test case for non-admin requesting to return a book', function () {
    let result = busayo.requestToReturnBook('Physics1', 1);
    test('adds a request to the returnRequests array', function () {
      // confirm that the request was added to the returnRequests array
      expect(database.returnRequests.length).toBe(1);
      expect(database.returnRequests[0]).toHaveProperty('userId', 1);
      // check if confirmation statement is returned
      expect(result).toBe('Request submitted!');    
    })
  })
})
