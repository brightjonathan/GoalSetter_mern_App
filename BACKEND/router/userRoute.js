const express = require('express');
const router = express.Router();

//destruct   ing the usercontroller
const {
    registeruser, 
    loginuser,
    getme
} = require('../controller/userController');
const {protect}  = require('../middleware/authMiddleware')


//all router
router.post('/', registeruser)
router.post('/login', loginuser)
router.get('/me', protect, getme)

module.exports= router