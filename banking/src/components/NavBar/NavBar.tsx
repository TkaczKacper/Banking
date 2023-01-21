import React from "react";
import { Link } from "react-router-dom";

import './navbar.css';

const NavBar = () => {
     return (
          <div className="navbar">
               <Link to={'/'} className="nav-link">Main</Link>
               <Link to={'/login'} className="nav-link">Login</Link>
               <Link to={'/register'} className="nav-link">Register</Link>
               <div className="right-space" />
          </div>
     );
};

export default NavBar;
