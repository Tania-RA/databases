require('dotenv').config();

const express = require("express");
const router = express.Router();
const connection = require("../connect");

router.post('/', (req, res) => {
  const country = (req.body.country);
  connection.execute("SELECT country.Name as 'Country', city.Name as 'Capital' from country inner join city on country.Capital=city.ID where country.Name=?", [country], (err, data, fields) => {
    !err ? res.json(data) : res.json({ err });
  });
});

router.post('/regionLanguages', (req, res) => {
  const region = req.body.region;
  connection.execute("SELECT cl.Language FROM countryLanguage cl inner join country c on c.Code=cl.countryCode where c.name=?", [region], (err, data, fields) => {
    !err ? res.json(data) : res.json({ err });
  });
});

router.post("/countOfCities", (req, res) => { 
  const lang = req.body.lang;
  connection.execute("SELECT count(c.Name) as Count FROM city c inner join countryLanguage cl on c.countryCode=cl.countryCode where cl.Language=?", [lang], (err, data, fields) => {
    !err ? res.json(data) : res.json({ err });
  });
})

router.get("/langInContinents", (req, res) => { 
  connection.execute('SELECT c.Continent, count(cl.Language) AS CountOfLangSpoken FROM country c inner join countryLanguage cl on c.Code = cl.countryCode GROUP BY c.Continent', (err, data) => {
    !err ? res.json(data) : res.json({ err });
  })
})

module.exports = router;