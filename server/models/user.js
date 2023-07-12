const { Schema, Types, model } = require('mongoose');
const isStrongPassword = require('validator/lib/isStrongPassword');
const isEmail = require('validator/lib/isEmail');


const userSchema = new Schema({
    _id:Types.ObjectId,
    name: {
        type: String,
        required: true,
        maxlength: [100, 'The username is too long'],
        minlength: [1, 'The username is too short'],
    },
    lastName: {
        type: String,
        required: [true, 'you must have a last name'],
        maxlength: [100, 'The last name is too long'],
        minlength: [1, 'The last name is too short']
    },

    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 256,
        unique: [true,"Invalid email"],
        validate: [isEmail, 'Please provide current E-mail']
    },
    phone: {
        type: String,
        unique: [true,"Invalid phone"],
        required: [true, ' Please provide phone number'],
        minlength: [6, 'Phone must contain 9 digits'],
        maxlength: [20, 'Phone number can contain maximum  20 digits']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'The password must contain a minimum of 6 characters'],
        maxlength: [200, 'The password must contain a maximum of 200 characters'],
        select: false,
        validate: {
            validator: function (value) {
                return isStrongPassword(value, {
                    minUppercase: 1,
                    minLowercase: 1,
                    minNumbers: 1,
                    minSymbols: 0,
                    maxLength: 20
                });
            },
            message: 'The password must contain at least one uppercase letter, one lowercase letter, and one number'
        }
    }

    // ,
    // favorites: [{ type: Types.ObjectId, ref: 'card' }]
})

module.exports = model('User', userSchema)