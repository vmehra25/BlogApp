import React, { useState } from 'react'
import axios from 'axios'
import '../css/YourBlog.css'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import CardViewBlog from './CardViewBlog'

const accessToken = localStorage.getItem("token")
axios.defaults.headers.common = { 'Authorization': `Bearer ${accessToken}` }

function YourBlog(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))
    const [pageNumber, setPageNumber] = useState(0)
    const [blogs, setBlogs] = useState(null)

    const getYourBlogs = () => {
        console.log("OK")
        axios({
            method: "GET",
            url: `http://localhost:3000/blog/getUserBlogs/${pageNumber}`
        }).then(response => {
            console.log(response)
            if (response.data.data.length != 0) {
                setBlogs(response.data.data)
            } else {
                if (pageNumber != 0)
                    setPageNumber(pageNumber - 1)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const PrevPage = () => {
        console.log("prev page")
        setPageNumber((prevPageNumber) => {
            if (prevPageNumber == 0) {
                return 0;
            } else {
                return prevPageNumber - 1;
            }
        })
        setBlogs(null)
    }

    const NextPage = () => {
        console.log("next page")
        setPageNumber((prevPageNumber) => {
            if (blogs != null && blogs.length === 3) {
                return prevPageNumber + 1
            } else {
                return prevPageNumber
            }
        })
        setBlogs(null)
    }

    return (
        <div>
            { isLoggedIn ? (
                <>
                    <div>
                        <button className="button-slide slide-left prev-background" onClick={() => PrevPage()}>Prev</button>
                        <button className="button-slide slide-left next-background" onClick={() => NextPage()}>Next</button>
                    </div>
                    {(blogs != null) ?
                        <div className="row row-sm-1 row-md-3 row-lg-3" id="CardViewDiv">
                            {blogs.map((blog, idx) => {
                                return (
                                    <CardViewBlog blogTitle={blog.title} blogContent={blog.content} linkToBlog={"/your_blogs/" + blog._id}></CardViewBlog>
                                )
                            })
                            }
                        </div>
                        :
                        getYourBlogs()
                    }
                </>
            ) : (
                    <>
                        <h1>Please Login To Continue</h1>
                    </>
                )
            }

        </div>
    )
}

export default YourBlog
