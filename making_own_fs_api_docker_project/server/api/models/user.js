const db = require('../db_config/config');
const Country = require('./country');

class User {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.citizenship = user.citizenship;
    this.passwordDigest = user.password_digest;
  }

  static getAllUsersData() {
    return new Promise(async (res, rej) => {
      try {
        let allData = await db.query('SELECT * FROM Users;');
        let allUsers = allData.rows.map((r) => new User(r));
        res(allUsers);
      } catch (err) {
        rej(`Users could not be accessed ${err}`);
      }
    });
  }

  static getUserByUsername(username) {
    return new Promise(async (res, rej) => {
      try {
        let allUserData = await db.query(`SELECT * FROM Users WHERE username = ${username}`);
        let makeUserObject = allUserData.rows.map((row) => new User(row));
        res(makeUserObject);
      } catch (err) {
        rej(`Username does not exist ${err}`);
      }
    });
  }

  static getUsersCountrysData(citizenship) {
    return new Promise(async (res, rej) => {
      try {
        let usersCountrysDataInDb = await db.query(`SELECT * FROM Countries WHERE countries = ${citizenship}`);
        let countryData = usersCountrysDataInDb.rows[0].map((row) => new Country(row));
        res(countryData);
      } catch (err) {
        rej(`Could not find relevant country data ${err}`);
      }
    });
  }

  static createNewUser(username, email, citizenship, password) {
    return new Promise(async (res, rej) => {
      try {
        let newUserIntoDb = await db.query(`INSERT INTO Users VALUES (${username}, ${email}, ${citizenship}, ${password})`);
        let newUserInstance = newUserIntoDb.rows[0].map((row) => new User(row));
        res(newUserInstance);
      } catch (err) {
        rej(`Could not create new user ${err}`);
      }
    });
  }
}

module.exports = User;
