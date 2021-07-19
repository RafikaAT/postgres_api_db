const db = require('../db_config/config');

class Country {
  constructor(country) {
    this.countryname = country.countryname;
    this.gdp_per_capita = country.gdp_per_capita;
    this.population_count = country.population_count;
  }

  static getAllCountriesData() {
    return new Promise(async (res, rej) => {
      try {
        let allData = await db.query('SELECT * FROM Countries;');
        let allCountries = allData.rows.map((r) => new Country(r));
        res(allCountries);
      } catch (err) {
        rej(`Countries could not be accessed ${err}`);
      }
    });
  }

  static getCountryByCountryName(countryname) {
    return new Promise(async (res, rej) => {
      try {
        let allCountryData = await db.query(`SELECT * FROM Countries WHERE countryname = ${countryname}`);
        let makeCountryObject = allCountryData.rows.map((row) => new Country(row));
        res(makeCountryObject);
      } catch (err) {
        rej(`Country does not exist ${err}`);
      }
    });
  }

  //   could make this a get all users who are a citizen of this country
  //   static getUsersCountrysData(citizenship) {
  //     return new Promise(async (res, rej) => {
  //       try {
  //         let usersCountrysDataInDb = await db.query(`SELECT * FROM Countries WHERE countries = ${citizenship}`);
  //       }
  //     });
  //   }

  static createNewCountry(countryname, gdp_per_capita, population_count) {
    return new Promise(async (res, rej) => {
      try {
        let newCountryIntoDb = await db.query(`INSERT INTO Countries VALUES (${countryname}, ${gdp_per_capita}, ${population_count})`);
        let newCountryInstance = newCountryIntoDb.rows[0].map((row) => new Country(row));
        res(newCountryInstance);
      } catch (err) {
        rej(`Could not create new country ${err}`);
      }
    });
  }
}

module.exports = Country;
