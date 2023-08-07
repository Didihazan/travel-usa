const express = require('express')
const router = express.Router()
const checkAuth = require("../middlewares/checkAuth");
const {getStays} = require("../controllers/cards");


router.get('/stayingCards', getStays)
module.exports = router