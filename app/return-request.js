/* eslint-disable class-methods-use-this */
const Request = require('./request');
const database = require('./database');
const Book = require('./book');
const User = require('./user');

// Return request class
class ReturnRequest extends Request {
	constructor(bookName, bookId, userId) {
		super(bookName, bookId, userId);
		// push this object to returnRequests array
		database.returnRequests.push(this);
	}

	// make a request to return book
	static create(bookName, bookId, userId) {
		return new ReturnRequest(bookName, bookId, userId);
	}

	// read all return requests
	static read() {
		return database.returnRequests;
	}

	// METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK
	// approve return requests in database
	static approve() {
		// loop through the array of returnRequests
		for (let index = 0; index < database.returnRequests.length; index++) {
			// extract the bookId and userId from each return request
			const { bookId, bookName, userId } = database.returnRequests[index];
			const user = User.readUser(userId);
			const book = Book.read(bookId);
			// check if book exists
			if (book === 'Invalid id') {
				database.returnRequests[index].isApproved = 'Invalid book id';
				return 'Invalid book id';
			}
			// remove book from booksBorrowed array of user
			user.booksBorrowed.splice(user.booksBorrowed.indexOf(bookName), 1);
			// approve the return request
			database.returnRequests[index].isApproved = true;
			// remove userId from borrowersId of book
			book.borrowersId.splice(book.borrowersId.indexOf(userId), 1);
			// increase the quantity available of the book by 1
			book.quantityAvailable += 1;
		}
		return 'All return requests have been attended to.';
	}
}

module.exports = ReturnRequest;
