/* eslint-disable */
const database = require('../app/database');
const Admin = require('../app/admin');
const NonAdmin = require('../app/non-admin');

describe('test cases for Admin methods', function () {
  let moses = new Admin('Moses Adebayo', 'mosesm@gmail.com', 'Librarian');
  moses.save();
  let grace = new Admin('Grace Igbokwe', 'graceg@gmail.com', 'Assistant Librarian');
  grace.save();
  let busayo = new NonAdmin('Busayo Onyeka', 'busayob@gmail.com', 'Teacher');
  busayo.save();
  let kingsley = new NonAdmin('Kingsley Olatunji', 'kingsleyk@gmail.com', 'Senior Student');
  kingsley.save();
  let austin = new NonAdmin('Austin Sharibu', 'austina@gmail.com', 'Junior Student');
  austin.save();

  describe('test for creating an admin', function () {
    test('checks for instance of Admin', function () {
      expect(moses instanceof Admin).toBeTruthy();
      expect(database.users[0]).toHaveProperty('name', 'Moses Adebayo');
    });
  });
  describe('test for admin reading a user', function () {
    test('returns a user by id', function () {
      let result = moses.readUser(4);
      expect(result.name).toBe('Kingsley Olatunji');
      expect(grace.readUser(504)).toBe('Invalid id');
    })
  })

  moses.createBook('Physics1', 'David Mogbeyi', 2);
  grace.createBook('Science2', 'Ochuko Oyebanji', 5);
  moses.createBook('Chemistry3', 'Seun Joeseph', 3);
  moses.createBook('Literature2', 'Amakiri Spiff', 1);
  grace.createBook('Agriculture1', 'Mike Ogbonna', 10);
  grace.createBook('Biology1', 'Mfoniso Abetang', 4);
  moses.createBook('Ecconomis', 'Rukevwe Nathan', 4)

  describe('test for admin creating a book', function () {
    test('confirms that new book was created', function () {
      expect(database.books[0]).toHaveProperty('name', 'Physics1');
      expect(database.books[1]).toHaveProperty('name', 'Science2');
    });
  })
  describe('test for admin updating a book by id', function () {
    test('confirms that book was updated', function () {
      moses.updateBook(1, { totalQuantity: 8 });
      grace.updateBook(2, { name: 'Primary Science2' });
      expect(database.books[0]).toHaveProperty('totalQuantity', 8);
      expect(database.books[1]).toHaveProperty('name', 'Primary Science2');
      expect(grace.updateBook(59, { totalQuantity: 2 })).toBe('Invalid id');
      expect(grace.updateBook(1, 'name')).toBe('Invalid update parameter');
    })
  });
  describe('test for admin reading a book by id', function () {
    test('returns a book by given id', function () {
      let result = grace.readABook(1);
      expect(result).toHaveProperty('author', 'David Mogbeyi');
      expect(grace.readABook(59)).toBe('Invalid id');
    })
  })
  describe('test for admin reading all books in the database', function () {
    test('returns all books in the database', function () {
      expect(moses.readAllBooks().length).toBe(7);
    })
  })
  describe('test for admin deleting a book by id', function () {
    test('deletes book fron database', function () {
      grace.deleteBook(6);
      expect(database.books.length).toEqual(6);
      expect(grace.deleteBook(200)).toBe('Invalid id');
    })
  })

  // TEST FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK
  busayo.requestToBorrowBook('Physics1', 1);
  austin.requestToBorrowBook('Physics1', 1);
  busayo.requestToBorrowBook('Physics1', 1);
  kingsley.requestToBorrowBook('Physics1', 1);
  austin.requestToBorrowBook('Chemistry3', 3);
  kingsley.requestToBorrowBook('Literature2', 4);
  austin.requestToBorrowBook('Biology1', 6);
  busayo.requestToBorrowBook('Literature2', 4);
  busayo.requestToBorrowBook('Agriculture1', 5);
  austin.requestToBorrowBook('Science2', 2);
  austin.requestToBorrowBook('Agriculture1', 5);

  describe('test for admin reading all borrow requests', function () {
    test('returns an array of all borrow requests', function () {
      expect(moses.readBorrowRequests().length).toBe(11);
    })
  })

  describe('test for admin approving borrow requests', function () {
    moses.approveBorrowRequests();
    test('confirms approval status of borrowRequests', function () {
      expect(database.borrowRequests[0].isApproved).toBe(true);
      expect(database.borrowRequests[1].isApproved).toBe('You have already borrowed this book!');
    })
  })

  // assuming a book was updated by changing the quantity available
  moses.updateBook(3, { totalQuantity: 6 });
  describe('test case for updating the quantity of a book', function () {
    test('confirms that the quantity available is changed in respect to the new total quantity', function () {
      expect(database.books[2].quantityAvailable).toBe(5);
    })
  })

  austin.requestToReturnBook('Biology1', 6);
  austin.requestToReturnBook('Social Studies2', 19);
  describe('test for admin reading all return requests', function () {
    test('returns an array of all return requests', function () {
      expect(moses.readReturnRequests().length).toBe(2);
    })
  })
  grace.approveReturnRequests();
  describe('test for admin approving return requests', function () {
    test('confirms approval status of returnRequests', function () {
      expect(database.returnRequests[0].isApproved).toBe(true);
    })
    test('test that returned book was removed from booksBorrowed array of user', function () {
      expect(database.users[4].booksBorrowed).toEqual(expect.not.arrayContaining(['Biology1']));
    })
    test('confirms that userId was removed from borrowers array of book', function () {
      expect(database.books[5].borrowersId).toEqual(expect.not.arrayContaining([3]));
    })
  })
  // console.log(database);
})
