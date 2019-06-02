/* eslint-disable class-methods-use-this */
import database from './database';
import Book from './book';
import generateId from './id-generator';

// user class
class User {
	constructor(name, email) {
		this.name = name;
		this.email = email;
		// use generateId function to generate userId
		this.userId = generateId(database.users, 'userId');
	}

	// save user to database
	save() {
		database.users.push(this);
	}

	// search a user method
	searchUser(name) {
		// a regular expression to match any user with such a name
		const regex = new RegExp(name, 'g');
		// an array to store all matched users
		const usersWithName = [];
		for (let index = 0; index < database.users.length; index++) {
			if (regex.test(database.users[index].name)) {
				usersWithName.push({ name: database.users[index].name });
			}
		}
		if (usersWithName.length) return usersWithName;
		return 'name not found';
	}

	// User updates his/her properties
	updateUser(updateObject) {
		if (updateObject.email) {
			// if updateObject has email property
			// update property from the updateObject parameter
			this.email = updateObject.email;
			return 'Update was successful';
		}
		return 'Invalid update parameter';
	}

	// read a user by id method
	static readUser(userId) {
		for (let index = 0; index < database.users.length; index++) {
			// loop through the users array and find the user with the id
			if (database.users[index].userId === userId) {
				return database.users[index];
			}
		}
		return 'Invalid id';
	}

	// user deletes account
	delete() {
		for (let i = 0; i < database.users.length; i += 1) {
			if (database.users[i].userId === this.userId) {
				database.users.splice(i, 1);
				break;
			}
		}
		return 'Account successfully deleted';
	}

	// User searches for book by name
	searchBook(word) {
		return Book.search(word);
	}
}

export default User;
