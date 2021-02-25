import React, { Component } from 'react'

export default class BlogView extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            authorId:"",
            authorName:"",
            authorPictureUrl:"",
            content:"",
            likes:"",
            title:""
        }
    }

    initBlogView(){
        const authorId = this.state.authorId
        const authorName = this.state.authorName
        const authorPictureUrl = this.state.authorPictureUrl
        const content = this.state.content
        const likes = this.state.likes
        const title = this.state.title
        document.getElementById("titleBlog").innerText = title

    }

    componentDidMount(){
        this.initBlogView()
    }

    render() {
        return (
            <div>
                <h1 id="titleBlog"></h1>
            </div>
        )
    }
}
