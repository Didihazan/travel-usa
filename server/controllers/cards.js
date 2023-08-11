const Card = require('../models/card')
module.exports = {
    getStays: async (req, res) => {
        try {
            const stayingCards = await Card.find({stays: true}).select("+stays");
            res.status(200).json({
                stayingCards
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    getAllCard: async (req, res) => {
        try {
            const allCards = await Card.find();
            res.status(200).json({
                allCards
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}