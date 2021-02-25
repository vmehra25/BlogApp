const express = require('express')

const blogCtrl = require('../controllers/blogController')
const router = express.Router()

const auth = require('../authToken')

router.get('/all/:pageNumber', blogCtrl.getAllBlogs)
router.get('/getUserBlogs/:pageNumber', auth.authToken, blogCtrl.getUserBlogs)
router.get('/:id', blogCtrl.getBlogById)


router.post('/create', auth.authToken, blogCtrl.createBlog)
router.post('/delete/:id', auth.authToken, blogCtrl.deleteBlogById)
router.post('/update/:id', auth.authToken, blogCtrl.updateBlogById)
router.post('/title', blogCtrl.getBlogsByTitle)

module.exports = router