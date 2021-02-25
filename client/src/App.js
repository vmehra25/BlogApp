import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import Login from './components/Login'
import Logout from './components/Logout'
import Navbar from './components/Navbar'
import WriteBlog from './components/WriteBlog' 
import Home from './components/Home'
import YourBlog from './components/YourBlog';
import ReadBlog from './components/ReadBlog';
import YourBlogView from './components/YourBlogView';
import UpdateBlog from './components/UpdateBlog';
import {
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch
} from 'react-router-dom'





function App(){

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))

    return (
      <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/write" exact component={WriteBlog}/>
          <Route path="/your_blogs" exact component={YourBlog}/>
          <Route path="/read/:id" exact component={ReadBlog}/>
          <Route path="/your_blogs/:id" exact component={YourBlogView} />
          <Route path="/update/:id" exact component={UpdateBlog}/>
        </Switch>
      </div>
      </Router>
    );
}

export default App;
