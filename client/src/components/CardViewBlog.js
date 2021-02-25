import React from 'react'
import { Link } from 'react-router-dom'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

function CardViewBlog({blogTitle, blogContent, linkToBlog}){
    return (
    <div className="card row" style={{width:'40rem', margin:"5em auto 1em auto", fontSize:"14px", height:'35rem'}}>
        <div className="card-body row-md-3">
          <h3 style={{textAlign:"center"}} className="card-title">{blogTitle}</h3>
          <p style={{textAlign:"left", overflowWrap:"break-word", textOverflow:"ellipsis", overflow:"hidden", maxHeight:"270px"}} className="card-text wrap">{blogContent}</p>
        </div>
        <Link target={"_blank"} to={linkToBlog}><button className="button-slide slide-left blue-background">READ</button></Link>
    </div>
    )
}

export default CardViewBlog;
