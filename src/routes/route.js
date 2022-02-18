const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

const msgController = require('../controllers/messageController')

const middleware = require('../middleware/userAuth')


router.post('/registerUser' ,  userController.createUser )
router.post('/login', userController.loginUser)
router.post('/sendMessage' ,middleware.userAuth, msgController.createMessage )
router.get('/getMessage/:userId' ,middleware.userAuth, msgController.getMessage )




module.exports = router;
