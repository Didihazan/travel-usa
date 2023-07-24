const express = require('express')
const router = express.Router()
const {signup,
  login,getId}=require('../controllers/users')
const checkAuth = require("../middlewares/checkAuth");


router.post('/signup',signup)
router.post('/login',login)
router.get('/token',checkAuth,getId)

module.exports = router