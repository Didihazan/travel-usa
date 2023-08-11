const mongoose = require("mongoose");
const Card = require("./models/card");
const CodeJSON = require("./card.json");

const initializeFunction = async () => {
    try {
        const existingCardsCount = await Card.countDocuments({});

        if (existingCardsCount !== CodeJSON.length) {
            // Delete all existing cards
            await Card.deleteMany({});

            // Add _id field to each card object
            const cardsWithId = CodeJSON.map(card => ({ _id: new mongoose.Types.ObjectId(), ...card }));

            // Insert new cards
            await Card.insertMany(cardsWithId);

            console.log("Cards have been replaced and updated successfully.");
        } else {
            console.log("No change needed. Cards are up to date.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

initializeFunction();
