const User = require('../models/user');
const { Types } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');

const hashAsync = util.promisify(bcrypt.hash);
const compareAsync = util.promisify(bcrypt.compare);

module.exports = {
    signup: async (req, res) => {
        try {
            const {name,lastName, email,phone, password } = req.body;
            const hash = await hashAsync(password, 10);
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: 'This email exists in the system'
                });
            }

            const user = new User({
                _id: new Types.ObjectId(),
                name,
                lastName,
                email,
                phone,
                password: hash
            });

            await user.save();

            res.status(200).json({
                message: 'user created'
            });
        } catch (error) {
            res.status(500).json({
                message:error.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const users = await User.find({ email });

            if (users.length === 0) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            const [user] = users;

            const result = await compareAsync(password, user.password);

            if (result) {
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,
                }, process.env.JWT_KEY, {
                    expiresIn: "1H"
                });

                return res.status(200).json({
                    message: 'Auth successful',
                    token
                });
            }

            res.status(401).json({
                message: 'Auth failed'
            });
        } catch (error) {
            res.status(500).json({
                error
            });

        }
    }
}
