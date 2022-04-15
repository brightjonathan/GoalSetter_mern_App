const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

//using asyncHandler dependency... to handle all error in a func...
const asyncHandler = require('express-async-handler');
const User = require('../modelSchema/userSchema');


//@desc      user registration
//@route    POST /api/users
//@access    public
const registeruser = asyncHandler(async (req, res) =>{
   
    const {name, email, password} = req.body;
    
    //if the input is empty
    if(!name || !email || !password ){
        res.status(400)
        throw new Error('please enter the input fields')
    }
    
    //checking if the user Exit
    let userExit = await User.findOne({email});
    if(userExit) {
        res.status(400)
        throw new Error('user already Exit')
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    
    //create user
    const user = await User.create({
        name,
        email,
        password: hashedpassword
    });

    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,

            //token into the schema
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('invalid user data')
    }

})



//@desc      user Authentication
//@route    POST /api/users/login
//@access    public
const loginuser = asyncHandler(async (req, res) =>{
     
    const {email, password} = req.body;

    //check for user by email
    const user = await User.findOne({email});

    //return true if both operand are true or otherwise that is false
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,

             //token into the login
             token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('invalid credential')
    }

});



//@desc      user data
//@route    GET /api/users/me
//@access    private 
const getme = asyncHandler(async (req, res) =>{
   const {_id, name, email} = await User.findById(req.user.id)

   res.status(200).json({
       id: _id,
       name,
       email
   })
})



//generate JWT token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}


module.exports = {
    registeruser,
    loginuser,
    getme
};
