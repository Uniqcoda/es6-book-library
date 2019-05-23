/* eslint-disable no-continue */
/* eslint-disable class-methods-use-this */
const Request = require('./request');
const database = require('./database');
const Book = require('./book');
const User = require('./user');

// borrow request class
class BorrowRequest extends Request {
	constructor(bookName, bookId, userId, userType) {
		super(bookName, bookId, userId);
		this.userType = userType;
		// push this object to borrowRequests array
		database.borrowRequests.push(this);
	}

	// make a request to borrow book
	create(bookName, bookId, userId, userType) {
		return new BorrowRequest(bookName, bookId, userId, userType);
	}

	// read all requests in database
	read() {
		return database.borrowRequests;
	}

	// METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK
	// attend to all borrow requests in database
	approve() {
		// sort array by user type
		const priority = { Teacher: 1, 'Senior Student': 2, 'Junior Student': 3 };
		database.borrowRequests.sort((user1, user2) => {
			return priority[user1.userType] - priority[user2.userType];
		});
		// loop through the sorted array of books
		for (let index = 0; index < database.borrowRequests.length; index++) {
			// extract the bookId and userId from each pendingRequest
			const { bookId, userId } = database.borrowRequests[index];
			// read user and book
			const user = User.prototype.readUser(userId);
			const book = Book.read(bookId);
			// confirm that user is not requesting to borrow a book more than once
			if (user.booksBorrowed.includes(book.name)) {
				database.borrowRequests[index].isApproved = 'You have already borrowed this book!';
				continue;
			}
			// check if user has borrowed up to 3 books without returning any
			if (user.booksBorrowed.length > 2) {
				database.borrowRequests[index].isApproved = 'You have exceeded the borrow limit per person!';
				continue;
			}
			// if the book is not available
			if (book.quantityAvailable < 1) {
				database.borrowRequests[index].isApproved = 'Book taken';
				continue;
			}
			// reduce the quantity available of the book by 1
			book.quantityAvailable -= 1;
			// approvee the borrow request
			database.borrowRequests[index].isApproved = true;
			// add userId to borrowersId of book
			book.borrowersId.push(database.borrowRequests[index].userId);
			// add book to booksBorrowed array of user
			user.booksBorrowed.push(database.borrowRequests[index].bookName);
		}
		return 'All borrow requests have been attended to.';
	}
}

module.exports = BorrowRequest;
