const express = require('express')
const router = express.Router()
const checkAuth = require("../middlewares/checkAuth");
const {getStays, getAllCard} = require("../controllers/cards");


router.get('/stayingCards', getStays)
router.get('/getAll',getAllCard)
module.exports = router