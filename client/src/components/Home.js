import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import { useState } from 'react'
import CardViewBlog from './CardViewBlog'
import axios from 'axios'

export default class Home extends Component {


    constructor(props){
        super(props)
        this.state = {
            pageNumber:0,
            blogs:null
        }
        console.log(this.props.match.params)
    }

    getAllBlogs() {
        axios({
            method: "GET",
            url: `http://localhost:3000/blog/all/${this.state.pageNumber}`
        }).then(response => {
            console.log(response)
            if (response.data.data.length != 0) {
                this.setState({blogs: response.data.data})
            } else {
                if (this.state.pageNumber > 0){
                    this.setState({pageNumber:this.state.pageNumber - 1})
                    this.setState({blogs:null})
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }

    PrevPage() {
        console.log("prev page")
        if(this.state.pageNumber == 0){
            this.setState({pageNumber: 0})
        }else{
            this.setState({pageNumber: this.state.pageNumber-1})
        }
        this.setState({blogs: null})
    }

    NextPage() {
        console.log("next page")
        if(this.state.blogs != null && this.state.blogs.length === 3){ 
            this.setState({pageNumber: this.state.pageNumber + 1})
        }else{
            this.setState({pageNumber: this.state.pageNumber})
        }
        this.setState({blogs: null})
    }



    render() {
        return (
            <>
                <div className="container">
                    <div>
                        <button className="button-slide slide-left prev-background" onClick={() => this.PrevPage()}>Prev</button>
                        <button className="button-slide slide-left next-background" onClick={() => this.NextPage()}>Next</button>
                    </div>
                </div>
                {
                    (this.state.blogs != null) ?

                        <div className="row row-sm-1 row-md-3 row-lg-3" id="CardViewDiv">
                            {this.state.blogs.map((blog, idx) => {
                                return (
                                    <CardViewBlog blogTitle={blog.title} blogContent={blog.content} linkToBlog={"/read/" + blog._id}></CardViewBlog>
                                )
                            })
                            }
                        </div>

                        :
                        this.getAllBlogs()
                }
            </>
        )
    }

}