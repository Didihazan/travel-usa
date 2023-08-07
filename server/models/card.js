const { Schema, Types, model } = require('mongoose');
const vacationCard = new Schema({
    _id:Types.ObjectId,
    title:{
        type:String
    },
    caption:{
        type:String
    },
    imageSrc:{
        type:String
    },
    fullDescription:{type:String
    },
    stays:{type:Boolean,
    require
    }
})
module.exports = model('Card', vacationCard)

