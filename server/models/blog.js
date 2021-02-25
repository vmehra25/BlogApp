const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Blog = new Schema(
    {
        title:{type:String, required:true},
        content:{type:String, required:true},
        authorId:{type:String, required:true},
        authorName:{type:String, required:true},
        authorPictureUrl:{type:String, required:true},
        likes:{type:Number, required:true}
    },
    {timestamps: true}
)

module.exports = mongoose.model('blogs', Blog)