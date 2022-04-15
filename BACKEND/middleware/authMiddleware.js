const jwt = require('jsonwebtoken'); 
const asyncHandler = require('express-async-handler');

const User = require('../modelSchema/userSchema');

//authenticating the route or protecting the route
const protect = asyncHandler( async (req, res, next) =>{

    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verifying token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.user = await User.findById(decoded.id).select(['-password'])
            next()
        } catch (error) {
             console.log(error)
             res.status(401)
             throw new Error('Not authorized')
        }
    }

    //if there is no token
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    };

});


module.exports = {
    protect
};