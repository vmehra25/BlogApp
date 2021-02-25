import '../css/WriteBlog.css'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import React, { useState } from 'react'

const accessToken = localStorage.getItem("token")
axios.defaults.headers.common = { 'Authorization': `Bearer ${accessToken}` }

function WriteBlog(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))
    console.log(isLoggedIn)

    async function createNewBlog(event) {
        event.preventDefault()
        var title = document.getElementById("titleBlog")
        var content = document.getElementById("contentBlog")
        if (title.value.length == 0 || content.value.length == 0) {
            document.getElementById("error_message").innerText = "Please fill both fields"
            return;
        }


        document.getElementById("submitBtn").innerText = "SAVING"
        document.getElementById("submitBtn").disabled = true
        axios({
            method: "POST",
            url: "http://localhost:3000/blog/create",
            data: {
                title: title.value,
                content: content.value
            }
        }).then(response => {
            console.log(response)
            document.getElementById("submitBtn").innerText = "SAVED"
            setTimeout(() => {
                props.history.push("/")
            }, 1500)
        }).catch(err => {
            console.log(err)
            document.getElementById("submitBtn").value = "TRY AGAIN"
            document.getElementById("submitBtn").disabled = false
        })

    }


    return (
        <div>
            {
                isLoggedIn ? (
                    <div className="container contact-form">
                        <form className="form-border" onSubmit={createNewBlog}>
                            <h3 style={{ fontSize: 40 }}>Write your new Blog</h3>
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
                                        <button id='submitBtn' type="submit" name="btnSubmit" className="button-slide slide-left btnContact" >Publish</button>
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

export default WriteBlog