const jwt = require('jsonwebtoken')
const User = require('../models/user');
const checkAuth = async (req,res,next)=>{

    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({
                status: 'Fail',
                message: 'You are not logged in! Please log in to get access'
            });
        }

        const decoded = await jwt.verify(token,process.env.JWT_KEY)
        console.log(decoded)
        const currentUser = await User.findById(decoded.id);
        req.user = currentUser;
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                massage: 'The user belonging to this token does no longer exist.'
            });
        }
        next()
    }catch (error){
        res.status(401).json({
            status: 'fail',
            message:error.message
        })
    }

}
module.exports = checkAuth