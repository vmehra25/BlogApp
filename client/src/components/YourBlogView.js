import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class YourBlogView extends Component {


    initBlogData(blog) {
        document.getElementById("titleBlog").innerText = blog.title
        document.getElementById("authorName").innerText = "By " + blog.authorName.toUpperCase()
        document.getElementById("content").innerText = blog.content
        document.getElementById("authorPicture").src = blog.authorPictureUrl
        document.getElementById("likes").innerText = `${blog.likes} Likes`
    }



    getBlog() {
        const blogId = this.props.match.params.id
        axios({
            method: "GET",
            url: `http://localhost:3000/blog/${blogId}`
        }).then(response => {
            this.initBlogData(response.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    likeBlogToggle() {
        const likeButton = document.getElementById("likeButton")
        if (likeButton.innerText === "Like") {
            const accessToken = localStorage.getItem("token")
            const blogId = this.props.match.params.id
            if (accessToken) {
                axios.defaults.headers.common = { 'Authorization': `Bearer ${accessToken}` }
                axios({
                    method: "POST",
                    url: "http://localhost:3000/like/likeBlog",
                    data: {
                        blogId: blogId
                    }
                }).then(response => {
                    console.log(response)
                    likeButton.innerText = "Liked"
                    likeButton.classList.remove("red-background")
                    likeButton.classList.add("blue-background")
                    const likeVal = parseInt(document.getElementById('likes').innerText.split(' ')[0]) + 1
                    document.getElementById("likes").innerText = `${likeVal} Likes`
                }).catch(err => {
                    console.log(err)
                })
            } else {

            }
        } else if (likeButton.innerText === "Liked") {
            const accessToken = localStorage.getItem("token")
            const blogId = this.props.match.params.id
            if (accessToken) {
                axios.defaults.headers.common = { 'Authorization': `Bearer ${accessToken}` }
                axios({
                    method: "POST",
                    url: "http://localhost:3000/like/unlikeBlog",
                    data: {
                        blogId: blogId
                    }
                }).then(response => {
                    console.log(response)
                    likeButton.innerText = "Like"
                    likeButton.classList.remove("red-background")
                    likeButton.classList.add("blue-background")
                    const likeVal = parseInt(document.getElementById('likes').innerText.split(' ')[0]) - 1
                    document.getElementById("likes").innerText = `${likeVal} Likes`
                }).catch(err => {
                    console.log(err)
                })
            } else {
                alert('Please login to like!')
            }
        }

    }

    getLikeStatus() {
        const accessToken = localStorage.getItem("token")
        const blogId = this.props.match.params.id
        if (accessToken) {
            axios.defaults.headers.common = { 'Authorization': `Bearer ${accessToken}` }
            axios({
                method: "POST",
                url: "http://localhost:3000/like/getStatus",
                data: {
                    blogId: blogId
                }
            }).then(response => {
                console.log(response.data)
                if (response.data.liked === true) {
                    document.getElementById('likeButton').innerText = "Liked"
                    document.getElementById('likeButton').classList.add("blue-background")
                } else {
                    document.getElementById('likeButton').innerText = "Like"
                    document.getElementById('likeButton').classList.add("red-background")
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    deleteBlog() {
        const accessToken = localStorage.getItem("token")
        const blogId = this.props.match.params.id
        if (accessToken) {
            axios.defaults.headers.common = { 'Authorization': `Bearer ${accessToken}` }
            axios({
                method: "POST",
                url: `http://localhost:3000/blog/delete/${blogId}`
            }).then(response => {
                console.log(response.data)
                if (response.data.success === true) {
                    document.getElementById('deleteButton').innerText = "Deleted"
                    setTimeout(() => {
                        this.props.history.push("/")
                    }, 1200)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    updateCurrentBlog(){
        console.log("YES");
        this.props.history.push(`/update/${this.props.match.params.id}`)
    }

    componentDidMount() {
        this.getBlog()
        this.getLikeStatus()
    }

    render() {
        return (
            <div>
                <div className="row row-sm-1 row-md-3 row-lg-3">
                    <button id="likeButton" onClick={() => this.likeBlogToggle()} className="button-slide slide-left ">Like</button>

                    <button id="updateButton" className="button-slide slide-left pal1-background" onClick={() => this.updateCurrentBlog()}>
                        Update
                    </button>



                    <button id="deleteButton" className="button-slide slide-left black-background" onClick={() => this.deleteBlog()}>Delete</button>
                </div>
                <h1 id="titleBlog"></h1>
                <h3 id="authorName"></h3><h4 id="likes"></h4>
                <image id="authorPicture"></image>
                <br></br>
                <p id="content" style={{ textAlign: "left", marginRight: "2em", marginLeft: "2em" }}></p>
            </div>
        )
    }
}
