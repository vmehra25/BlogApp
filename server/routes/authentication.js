const express = require('express')

const authCtrl = require('../controllers/authenticationController')
const router = express.Router()


router.post('/googleLogin', authCtrl.googleLogin)
module.exports = router