import React, { Component } from 'react'
import axios from 'axios'

var blogId = ""
export default class UpdateBlog extends Component {

    isLoggedIn = localStorage.getItem('token')
    constructor(props){
        super(props)
    }

    initBlog(blog) {
        document.getElementById("titleBlog").value = blog.title
        document.getElementById("contentBlog").value = blog.content
        blogId = blog._id
    }

    initForm() {
        const blogId = this.props.match.params.id
        axios({
            method: "GET",
            url: `http://localhost:3000/blog/${blogId}`
        }).then(response => {
            this.initBlog(response.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    redirectToHome(){
        this.props.history.push('/')
    }

    updateCurrentBlog(event) {
        event.preventDefault()
        console.log("yes")
        var title = document.getElementById("titleBlog")
        var content = document.getElementById("contentBlog")
        if (title.value.length == 0 || content.value.length == 0) {
            document.getElementById("error_message").innerText = "Please fill both fields"
            return;
        }
        document.getElementById("submitBtn").innerText = "WAIT"
        document.getElementById("submitBtn").disabled = true
        
        axios({
            method: "POST",
            url: `http://localhost:3000/blog/update/${blogId}`,
            data: {
                title: title.value,
                content: content.value
            }
        }).then(response => {
            console.log(response)
            if (response.data.success)
                document.getElementById("submitBtn").innerText = "SAVED"
        }).catch(err => {
            console.log(err)
            document.getElementById("submitBtn").innerText = "INVALID REQUEST"
            document.getElementById("submitBtn").disabled = false
        })
        console.log("OK")
    }

    componentDidMount() {
        this.initForm()
    }

    render() {
        return (
            <div>
                {
                    this.isLoggedIn ? (
                        <div className="container contact-form">
                            <form className="form-border" onSubmit={this.updateCurrentBlog}>
                                <h3 style={{ fontSize: 40 }}>Update your Blog</h3>
                                <h4 id="error_message"></h4>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input autoComplete="off" type="text" id="titleBlog" name="titleBlog" className="form-control" placeholder="Title *(35 char max)" maxLength="35" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea name="contentBlog" id="contentBlog" className="form-control" placeholder="Your Blog *(1500 char max)" rows={12} maxLength="1500"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <button id='submitBtn' type="submit" name="btnSubmit" className="button-slide slide-left btnContact" >Update</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                            <>
                                <h1>Please Login To Continue</h1>
                            </>
                        )
                }

            </div>
        )
    }
}
