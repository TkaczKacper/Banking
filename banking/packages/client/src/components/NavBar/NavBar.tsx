import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./navbar.css";

const NavBar = () => {
   const [cookie, setCookie, removeCookie] = useCookies([
      "isLogged",
      "username",
      "userId",
   ]);
   return (
      <div className="navbar">
         <div className="navbar-left">
            {cookie.userId ? (
               <Link to={"/"}>
                  <img
                     src="https://www.mbank.pl/images/logos/mbank-logo-ind.gif"
                     alt="mBank"
                     className="nav-logo-left"
                  />
               </Link>
            ) : (
               <Link to={"/individual"}>
                  <img
                     src="https://www.mbank.pl/images/logos/mbank-logo-ind.gif"
                     alt="mBank"
                     className="nav-logo-left"
                  />
               </Link>
            )}

            <Link to={"/individual"}>
               <a className="nav-link">klienci indywidualni</a>
            </Link>
            <a
               className="nav-link"
               href="https://www.mbank.pl/private-banking/"
               target="_blank"
            >
               private banking
            </a>
            <a
               className="nav-link"
               href="https://www.mbank.pl/firmy/"
               target="_blank"
            >
               firmy
            </a>
            <a
               className="nav-link"
               href="https://www.mbank.pl/msp-korporacje/"
               target="_blank"
            >
               msp i korporacje
            </a>
         </div>
         <div className="navbar-right">
            {cookie.userId ? (
               <button
                  className="logout-btn"
                  onClick={() => {
                     setCookie("isLogged", false);
                     removeCookie("userId");
                     removeCookie("username");
                     window.location.href = "/login";
                  }}
               >
                  Wyloguj
               </button>
            ) : (
               <>
                  <Link to={"/register"} className="register-btn">
                     załóż konto osobiste
                  </Link>
                  <Link to={"/login"} className="login-btn">
                     zaloguj
                  </Link>
               </>
            )}
            <div className="right-space" />
         </div>
      </div>
   );
};

export default NavBar;
