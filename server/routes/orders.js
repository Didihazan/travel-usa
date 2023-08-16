const express = require('express')
const {getOrders, createOrder, deleteOrder} = require("../controllers/orders");
const router = express.Router()

router.get('/:userId',getOrders)
router.post('/add',createOrder)
router.delete('/del/:id',deleteOrder)

module.exports = router