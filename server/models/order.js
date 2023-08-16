const { Schema, Types, model } = require('mongoose');
const mongoose = require("mongoose");


const orderSchema = new Schema({
    _id:Types.ObjectId,
    userId:{type:mongoose.Schema.Types.ObjectId,  required:true, ref:'User'},
    cardId:{type:mongoose.Schema.Types.ObjectId,
        required:true, ref:'Card'}
})
module.exports = model('Order', orderSchema)