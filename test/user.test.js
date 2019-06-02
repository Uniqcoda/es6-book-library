import database from '../app/database';
import User from '../app/user';
import Admin from '../app/admin';
import NonAdmin from '../app/non-admin';

describe('test for user methods', () => {
	const daniel = new User('Daniel Ephraim', 'danield@gmail.com');
	daniel.save();
	const moses = new Admin('Moses Adebayo', 'mosesm@gmail.com');
	moses.save();
	const busayo = new NonAdmin('Busayo Onyeka', 'busayob@gmail.com', 'Teacher');
	busayo.save();
	const kingsley = new NonAdmin('Kingsley Olatunji', 'kingsleyk@gmail.com', 'Senior Student');
	kingsley.save();
	describe('test cases for creating a user', () => {
		test('check for instance of User', () => {
			expect(daniel instanceof User).toBeTruthy();
			expect(database.users[0]).toHaveProperty('name', 'Daniel Ephraim');
			expect(database.users).toHaveLength(4);
		});
	});
	describe('test for searching a user by name', () => {
		test('returns an array of the searched user result', () => {
			let result = moses.searchUser('Busayo');
			expect(result[0]).toHaveProperty('name', 'Busayo Onyeka');
			expect(busayo.searchUser('Tolu')).toBe('name not found');
		});
	});

	describe('test for updating user', () => {
		test('updates user properties', () => {
			busayo.updateUser({ email: 'bossbaby@gmail.com' });
			expect(database.users[2]).toHaveProperty('email', 'bossbaby@gmail.com');
			expect(busayo.updateUser('email')).toBe('Invalid update parameter');
		});
	});
	describe('test for admin deleting a user', () => {
		test('user deletes his account', () => {
			busayo.delete();
			expect(database.users[3]).toBeFalsy();
		});
	});

	describe('test for user searching a book by name', () => {
		moses.createBook('Physics1', 'David Mogbeyi', 5);
		moses.createBook('Agriculture1', 'Mike Ogbonna', 10);
		test('returns an array of the searched book result', () => {
			expect(daniel.searchBook('Physics1')[0]).toHaveProperty('author', 'David Mogbeyi');
			expect(moses.searchBook('Physics2')).toBe('name not found');
		});
	});
});
