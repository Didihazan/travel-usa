const mongoose = require("mongoose");
const Card = require("./models/card");
const CodeJSON = require("./card.json");

const initializeFunction = async () => {
    const allCards = await Card.find({});
    console.log()
    if (allCards.length !== CodeJSON.length) {
        // Add _id field to each destination object
        const cardsWithId = CodeJSON.map(card => ({ _id: new mongoose.Types.ObjectId(), ...card }));
        Card.create(cardsWithId);
    }
};

initializeFunction();
