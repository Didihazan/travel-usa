const Card = require('../models/card')
module.exports = {
    getStays: async (req, res) => {
        try {
            const stayingCards = await Card.find({stays: true});
            res.status(200).json({
                stayingCards
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}