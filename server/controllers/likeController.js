const Blog = require('../models/blog')
const User = require('../models/user')
const Like = require('../models/like')

module.exports.likeBlog = async (req, res) => {
    if(!req.body || !req.body.blogId || !req.body._id){
        return res.status(400).json({
            success:false,
            error: "Invalid request"
        });
    }else{
        await Like.findOne({blogId:req.body.blogId, userId:req.body._id})
    .then((response) => {
        if(response === null){
            console.log("here")
            Blog.findOneAndUpdate(
                {_id:req.body.blogId},
                {$inc:{"likes":1}},
                {useFindAndModify: false}
            ).then(() => {
                const like = new Like({blogId:req.body.blogId, userId:req.body._id});
                like.save()
                .then(() => {
                    res.json({
                    success:true
                })
                }).catch((err) => {
                    res.status(400).json({
                        success:false,
                        error:err
                    })
                })
            })
            
        }else{
            res.json({
                success:true
            })
        }
    }).catch(err => {
        res.status(400).json({
            success:false,
            error:err
        })
    })
    }
    
}



module.exports.unlikeBlog = async (req, res) => {
    if(!req.body || !req.body.blogId || !req.body._id){
        return res.status(400).json({
            success:false,
            error: "Invalid request"
        });
    }else{
        await Like.findOneAndDelete({
            blogId:req.body.blogId,
            userId:req.body._id
        }).then(response => {
            if(response != null){
                Blog.findOneAndUpdate(
                    {_id:req.body.blogId},
                    {$inc:{"likes":-1}},
                    {useFindAndModify: false}
                ).then(() => {
                    res.json({
                        success:true,
                    })
                })
            }
        }).catch(err => {
            res.status(400).json({
                error:err,
                success:false
            })
        })
    }
}

module.exports.getLikeStatus = async (req, res) => {
    if(!req.body || !req.body.blogId || !req.body._id){
        return res.status(400).json({
            success:false,
            error: "Invalid request"
        });
    }else{
        await Like.findOne({
            blogId: req.body.blogId,
            userId:req.body._id
        }).then(liked => {
            if(liked != null){
                return res.json({
                    success:true,
                    liked:true
                })
            }else{
                return res.json({
                    success:true,
                    liked:false
                })
            }
        })
    }
}