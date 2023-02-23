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
   const showMenu = () => {
      const dropdown = document.getElementById(
         "navbar-dropdown"
      ) as HTMLDivElement;
      dropdown.style.display === ""
         ? (dropdown.style.display = "block")
         : (dropdown.style.display = "");
   };
   return (
      <div className="navbar">
         <div className="navbar-left">
            {cookie.userId ? (
               <Link to={"/account"} className="navbar-logo">
                  <img
                     src="https://www.mbank.pl/images/logos/mbank-logo-ind.gif"
                     alt="mBank"
                     className="nav-logo-left"
                  />
               </Link>
            ) : (
               <Link to={"/individual"} className="navbar-logo">
                  <img
                     src="https://www.mbank.pl/images/logos/mbank-logo-ind.gif"
                     alt="mBank"
                     className="nav-logo-left"
                  />
               </Link>
            )}
            <Link to={"/individual"} className="nav-link">
               klienci indywidualni
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
         <div className="navbar-menu" onClick={() => showMenu()}>
            <div id="menu" />
            <div id="menu" />
            <div id="menu" />
            <div id="navbar-dropdown">
               <a href="/individual">klienci indywidualni</a>
               <a href="https://www.mbank.pl/private-banking/">
                  private banking
               </a>
               <a href="https://www.mbank.pl/firmy/">firmy</a>
               <a href="https://www.mbank.pl/msp-korporacje/">
                  msp i korporacje
               </a>
            </div>
         </div>
         <>
            {cookie.userId ? (
               <div className="navbar-right-logged">
                  <div id="user-profile">
                     Witaj,{" "}
                     <strong>
                        <Link to={"/account"} id="profile-link">
                           {cookie.username}
                        </Link>
                     </strong>
                  </div>
                  <button
                     id="logout-btn"
                     onClick={() => {
                        setCookie("isLogged", false, { path: "/" });
                        removeCookie("userId");
                        removeCookie("username");
                        window.location.href = "/login";
                     }}
                  >
                     Wyloguj
                  </button>
               </div>
            ) : (
               <div className="navbar-right">
                  <Link to={"/register"} className="register-btn">
                     załóż konto osobiste
                  </Link>
                  <Link to={"/login"} className="login-btn">
                     zaloguj
                  </Link>
               </div>
            )}
         </>
      </div>
   );
};

export default NavBar;
