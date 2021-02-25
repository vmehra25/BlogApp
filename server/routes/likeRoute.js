const express = require('express')

const likeCtrl = require('../controllers/likeController')
const router = express.Router()

const auth = require("../authToken")

router.post('/getStatus', auth.authToken, likeCtrl.getLikeStatus)

router.post('/likeBlog', auth.authToken, likeCtrl.likeBlog)
router.post('/unlikeBlog', auth.authToken, likeCtrl.unlikeBlog)

module.exports = router