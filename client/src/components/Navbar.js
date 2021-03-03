import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Login from '../components/Login'
import Logout from '../components/Logout'
import '../css/NavBar.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={"/your_blogs"} className="nav-link">My Blogs</Link>
            </li>
            <li className="nav-item">
              <Link to={"/write"} className="nav-link">Write</Link>
            </li>
            <br />
            {/* <li className="nav-item">
              <i className="fa fa-moon-o fa-2x" aria-hidden="true"></i>
            </li> */}
            {
              isLoggedIn ? (
                <li className="nav-item text-right">
                  <Logout setIsLoggedIn={setIsLoggedIn}></Logout>
                </li>
              ) : (
                  <li className="nav-item">
                    <Login setIsLoggedIn={setIsLoggedIn}></Login>
                  </li>
                )
            }
          </ul>

        </div>
      </nav>
    </div>
  )
}

export default Navbar;