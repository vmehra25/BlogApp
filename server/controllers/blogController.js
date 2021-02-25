const Blog = require('../models/blog')
const User = require('../models/user')
const Like = require('../models/like')

module.exports.createBlog = (req, res) => {

    const body = req.body
    if (!body || !body.title || !body.content || !body._id) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a blog'
        })
    }


    User.findOne({ _id: req.body._id }, (err, user) => {
        const blog = new Blog({
            title: body.title,
            content: body.content,
            authorId: user._id,
            authorName: user.name,
            authorPictureUrl: user.picture,
            likes: 0
        })
        if (!blog) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        blog
            .save()
            .then(() => {
                return res.json({
                    success: true,
                    id: blog._id,
                    message: 'Blog created'
                })
            })
            .catch((err) => {
                return res.json({
                    error: err,
                    message: 'Blog not created'
                })
            })
    })

}

module.exports.getAllBlogs = async (req, res) => {
    if (!req.params.pageNumber) {
        return res.status(400).json({
            success: false,
            error: "Invalid request"
        });
    } else {
        const pageNumber = req.params.pageNumber
        await Blog.find({})
            .limit(3)
            .skip(pageNumber * 3)
            .then((blogs) => {
                return res.json({
                    success: true,
                    data: blogs
                })
            }).catch(err => {
                res.status(400).json({
                    success: false,
                    error: err
                })
            })
    }

}

module.exports.getBlogById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            error: "Invalid request"
        });
    }
    await Blog.findOne({ _id: req.params.id })
        .then((blog) => {
            return res.json({
                success: true,
                data: blog
            })
        }).catch((err) => {
            res.status(400).json({
                success: false,
                error: err
            })
        })
}

module.exports.getBlogsByTitle = async (req, res) => {
    console.log("getBlogsByTitle1")
    if(!req.body || !req.body.title){
        return res.tatus(400).json({
            success: false,
            error: "Invalid request"
        });
    }
    console.log("getBlogsByTitle2")
    await Blog.find({title:{$regex: req.body.title}})
    .then((blogs) => {
        return res.json({
            success: true,
            data:blogs
        });
    }).catch((err) => {
        console.log(err)
        return res.status(400).json({
            success: false,
            error: err
        });
    })
}


module.exports.getUserBlogs = async (req, res) => {
    if (!req.params.pageNumber || !req.body._id) {
        return res.status(400).json({
            success: false,
            error: "Invalid request"
        });
    }
    const pageNumber = req.params.pageNumber
    await Blog.find({ authorId: req.body._id })
        .limit(3)
        .skip(pageNumber * 3)
        .then((blogs) => {
            return res.json({
                success: true,
                data: blogs
            })
        }).catch((err) => {
            return res.status(400).json({
                success: true,
                error: err
            })
        })
}


module.exports.deleteBlogById = async (req, res) => {
    if (!req.params.id || !req.body._id) {
        return res.status(400).json({
            success: false,
            error: "Invalid request"
        });
    }
    await Blog.findOneAndDelete({ _id: req.params.id, authorId: req.body._id }, (err, blog) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        if (!blog) {
            return res.json({
                success: false,
                error: 'Blog not found'
            })
        } else {
            Like.deleteMany({ blogId: req.params.id, userId: req.body._id })
                .then(() => {
                    return res.json({
                        success: true
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }).catch((err) => {
        console.log(err)
    })
}



module.exports.updateBlogById = async (req, res) => {
    if (!req.params.id || !req.body._id || !req.body.title || !req.body.content || (req.body.title.length == 0) || (req.body.content.length == 0)) {
        console.log('here')
        return res.status(400).json({
            success: false,
            error: "Invalid request"
        });
    }

    await Blog.updateOne(
        { _id: req.params.id, authorId: req.body._id },
        {$set: {title:req.body.title, content:req.body.content}}
        )
        .then(() => {
            return res.json({
                success: true
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                success:false,
                error:err
            })
        })
}










