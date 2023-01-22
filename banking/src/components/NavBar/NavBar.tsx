import React from "react";
import { Link } from "react-router-dom";

import './navbar.css';

const NavBar = () => {
     return (
          <div className="navbar">
               <div className="navbar-left">
                    <Link to={'/'}>
                         <img src="https://www.mbank.pl/images/logos/mbank-logo-ind.gif" alt="mBank" className="nav-logo-left" />
                    </Link>
                    <Link to={'/individual'}><a className="nav-link">klienci indywidualni</a></Link>
                    <a className="nav-link">private banking</a>
                    <a className="nav-link">firmy</a>
                    <a className="nav-link">msp i korporacje</a>
               </div>
               <div className="navbar-right">
                    <Link to={'/register'} className="register-btn">załóż konto osobiste</Link>
                    <Link to={'/login'} className="login-btn">zaloguj</Link>
                    <div className="right-space" />
               </div>
          </div>
     );
};

export default NavBar;
