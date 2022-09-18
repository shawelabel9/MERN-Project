const express = require('express')
const router = express.Router() 
const {userRegister,login, getUser} = require('../controllers/userControllers')
const {protect} = require('../MiddleWare/authMiddleWare')

router.post('/',userRegister)

router.post('/login', login)

router.get('/user',protect ,getUser)

module.exports = router
