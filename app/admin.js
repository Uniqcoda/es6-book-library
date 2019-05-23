/* eslint-disable class-methods-use-this */
const User = require('./user');
const Book = require('./book');
const BorrowRequest = require('./borrow-request');
const ReturnRequest = require('./return-request');

// Admin constructor
class Admin extends User {
	constructor(name, email, position) {
		super(name, email);
		this.position = position;
	}

	// Admin reads a user
	readUser(userId) {
		return User.readUser(userId);
	}

	// Admin creates a book (buys a book and adds to the library database)
	createBook(name, author, totalQuantity) {
		return Book.create(name, author, totalQuantity);
	}

	// Admin updates book properties by Id
	updateBook(bookId, key, value) {
		return Book.update(bookId, key, value);
	}

	// Admin reads all books available in the database
	readAllBooks() {
		return Book.readAll();
	}

	// Admin reads a book by Id
	readABook(bookId) {
		return Book.read(bookId);
	}

	// Admin deletes a book by Id
	deleteBook(bookId) {
		return Book.delete(bookId);
	}

	/* METHODS FOR THE PROCESSES OF BORROWING AND RETURNING A BOOK */
	// Admin reads all pending borrow requests
	readBorrowRequests() {
		return BorrowRequest.read();
	}

	// Admin approves requests in pending requests array
	approveBorrowRequests() {
		BorrowRequest.approve();
	}

	// Admin reads all pending return requests
	readReturnRequests() {
		return ReturnRequest.read();
	}

	// Admin approves return and replaces a returned book in the library
	approveReturnRequests() {
		return ReturnRequest.approve();
	}
}

module.exports = Admin;
