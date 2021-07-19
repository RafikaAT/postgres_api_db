const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Country = require('./models/country');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ greeting: 'hi!' });
});

app.get('/countries', async (req, res) => {
  try {
    let countries = await Country.getAllCountriesData();
    console.log(countries);
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

app.get('/country/:countryname', async (req, res) => {
  try {
    let countryId = req.params.index;
    let countryData = await Country.getCountryByCountryName(countryId);
    res.status(200).json(countryData);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

app.post('/login', async (req, res) => {
  try {
    let inputUsername = req.body.username;
    if (await User.getUserByUsername(inputUsername)) {
      let inputPassword = req.body.password;
      let user = await User.getUserByUsername(inputUsername);
      const authed = bcrypt.compare(inputPassword, user.passwordDigest);
      if (!!authed) {
        res.status(200).json({ user: user.username, citizenship: user.citizenship });
      } else {
        throw new Error('Password is incorrect');
      }
    } else {
      throw new Error('User could not be found');
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

app.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.password, salt);
    await User.create({ ...req.body, password: hashed });
    res.status(201).json({ msg: 'User created' });
  } catch (err) {
    res.status(500).json({ err });
  }
});
module.exports = app;
