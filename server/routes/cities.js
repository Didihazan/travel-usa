const express = require('express')
const router = express.Router()
const countriesData = require('../cities.json');

router.get('/:country', (req, res) => {
    const requestedCountry = req.params.country;
    if (countriesData[requestedCountry]) {
        res.json(countriesData[requestedCountry]);
    } else {
        res.status(404).json({ error: 'Country not found' });
    }
});

module.exports = router