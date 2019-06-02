import User from './user';
import BorrowRequest from './borrow-request';
import ReturnRequest from './return-request';

// NonAdmin class
class NonAdmin extends User {
	constructor(name, email, userType) {
		super(name, email);
		this.userType = userType;
		this.booksBorrowed = [];
	}

	/* METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK */

	// Non-admin requests to borrow a book
	requestToBorrowBook(bookName, bookId) {
		const { userId, userType } = this;
		BorrowRequest.create(bookName, bookId, userId, userType);
		return 'Request submitted!';
	}

	// Non-admin returns a book, (s)he won't be able to borrow more than 3 books at a time. This means that no user is allowed to hold more than 3 borrowed books
	requestToReturnBook(bookName, bookId) {
		const { userId } = this;
		ReturnRequest.create(bookName, bookId, userId);
		return 'Request submitted!';
	}
}

export default NonAdmin;
