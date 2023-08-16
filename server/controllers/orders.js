const User = require('../models/user');
const Order = require('../models/order');
const Card = require('../models/card');
const {Types} = require("mongoose");

module.exports = {
    getOrders: async (req, res) => {
        try {
            const userId = req.params.userId; // Assuming you get userId from request params

            const orders = await Order.find({ userId }).populate('cardId');
            // Fetch orders that match the provided userId and populate related card documents

            res.status(200).json({
                orders
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    createOrder: async (req, res) => {
        try {
            const userId = req.body.userId; // Assuming you get userId from request params
            const cardId = req.body.cardId; // Assuming you get cardId from request params

            // Check if the user exists
            const userExists = await User.exists({ _id: userId });
            if (!userExists) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Check if the card exists
            const cardExists = await Card.exists({ _id: cardId });
            if (!cardExists) {
                return res.status(404).json({ error: 'Card not found' });
            }
            const existingOrder = await Order.findOne({ userId, cardId });
            if (existingOrder) {
                return res.status(400).json({ error: 'Order already exists for this user and card' });
            }

            // Create a new order in the database
            await Order.create({_id: new Types.ObjectId(), userId, cardId });
            res.status(201).json({  message: 'order created' });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.id; // Assuming you get orderId from request params

            // Check if the order exists
            const orderExists = await Order.exists({ _id: orderId });
            if (!orderExists) {
                return res.status(404).json({ error: 'Order not found' });
            }

            // Delete the order from the database
            await Order.deleteOne({ _id: orderId });

            res.status(204).json(); // 204 No Content - Successful deletion
        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }
};
