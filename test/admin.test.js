var database = require('../app_methods/database');
var Admin = require('../app_methods/admin');
var BorrowRequest = require('../app_methods/borrow_request');
var NonAdmin = require('../app_methods/non_admin');


describe('test cases for Admin methods', function () {
  var moses = new Admin('Moses Adebayo', 'mosesm@gmail.com');
  moses.save();
  var grace = new Admin('Grace Igbokwe', 'graceg@gmail.com');
  grace.save();
  var busayo = new NonAdmin('Busayo Onyeka', 'busayob@gmail.com', 'Teacher');
  busayo.save();
  var kingsley = new NonAdmin('Kingsley Olatunji', 'kingsleyk@gmail.com', 'Senior Student');
  kingsley.save();
  var austin = new NonAdmin('Austin Sharibu', 'austina@gmail.com', 'Junior Student')
  austin.save();

  describe('test for creating an admin', function () {
    test('checks for instance of Admin', function () {
      expect(moses instanceof Admin).toBeTruthy();
      expect(database.users[0]).toHaveProperty('name', 'Moses Adebayo');
    });
  });
  describe('test for admin reading a user', function () {
    test('returns a book by id', function () {
      var result = moses.readUser(4);
      expect(result.name).toBe('Kingsley Olatunji');
      expect(grace.readUser(504)).toBe('Invalid id');
    })
  })

  moses.createBook('Physics1', 'David Mogbeyi', 2);
  grace.createBook('Science2', 'Ochuko Oyebanji', 5);
  moses.createBook('Chemistry3', 'Seun Joeseph', 3);
  moses.createBook('Literature2', 'Amakiri Spiff', 1);
  grace.createBook('Agriculture1', 'Mike Ogbonna', 10);
  grace.createBook('Biology1', 'Mfoniso Abetang', 4)

  describe('test for admin creating a book', function () {
    test('confirms that new book was created', function () {
      expect(database.books[0]).toHaveProperty('name', 'Physics1');
      expect(database.books[1]).toHaveProperty('name', 'Science2');
    });
  })
  describe('test for admin updating a book by id', function () {
    test('confirms that book was updated', function () {
      moses.updateBook(1, { totalQuantity: 8 });
      expect(database.books[0]).toHaveProperty('totalQuantity', 8);
      expect(grace.updateBook(59, { totalQuantity: 2 })).toBe('Invalid id');
    })
  });
  describe('test for admin reading a book by id', function () {
    test('returns a book by given id', function () {
      var result = grace.readABook(1);
      expect(result).toHaveProperty('author', 'David Mogbeyi');
      expect(grace.readABook(59)).toBe('Invalid id');
    })
  })
  describe('test for admin reading all books in the database', function () {
    test('returns all books in the database', function () {
      expect(moses.readAllBooks().length).toBe(6);
    })
  })
  describe('test for admin deleting a book by id', function () {
    test('deletes book fron database', function () {
      grace.deleteBook(1);
      expect(database.books.length).toEqual(5);
      expect(grace.deleteBook(200)).toBe('Invalid id');
    })
  })

  // TEST FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK
  busayo.requestToBorrow('Physics1', 1);
  austin.requestToBorrow('Physics1', 1);
  busayo.requestToBorrow('Physics1', 1);
  kingsley.requestToBorrow('Physics1', 1);
  austin.requestToBorrow('Chemistry3', 3);
  kingsley.requestToBorrow('Literature2', 4);
  austin.requestToBorrow('Biology1', 6);
  busayo.requestToBorrow('Literature2', 4);
  busayo.requestToBorrow('Agriculture1', 5);
  austin.requestToBorrow('Science2', 2);
  austin.requestToBorrow('Agriculture1', 5)

  describe('test for admin reading all borrow requests', function () {
    test('returns an array of all borrow requests', function () {
      expect(moses.readAllRequests().length).toBe(11)
    })
  })
  describe('test for admin approving borrow requests', function () {
    moses.approveRequests();
    test('confirms approval status of borrowRequests', function () {
      expect(database.borrowRequests[0].isApproved).toBe(true)
      expect(database.borrowRequests[1].isApproved).toBe('You have already borrowed this book!')

    })
  })
  // console.log(database.books);
  // console.log(database.borrowRequests);
  // describe('test for admin approving a return request', function () {
  //   grace.approveReturn();
  //   test('confirms approval status of returnRequests', function () {
  //     expect(database.returnRequests[0].isApproved).toBe(true);
  //   })
  // })
})
