import { Link } from "react-router-dom";
import { useState } from "react";
import "./accountNavBar.css";
import NewAccountModal from "../NewAccountModal/NewAccountModal";

const AccountNavBar = () => {
   const [modalActive, setModalActive] = useState(false);
   const openMenu = () => {
      const divsShown = document.getElementById("show") as HTMLDivElement;
      const divsHiden = document.getElementById("hide") as HTMLDivElement;
      const navLinks = document.getElementById(
         "nav-links-container"
      ) as HTMLDivElement;
      divsShown.id = "hide";
      divsHiden.id = "show";
      navLinks.style.display == ""
         ? (navLinks.style.display = "flex")
         : (navLinks.style.display = "");
   };
   return (
      <>
         <div className="accountNavBar">
            <div
               className="account-nav-menu"
               id="account-nav-menu"
               onClick={openMenu}
            >
               <div className="nav-menu-opener" id="show">
                  ⋁ twoje sprawy ⋁
               </div>
               <div className="nav-menu-opener" id="hide">
                  ⋀ ⋀ ⋀ ⋀ ⋀ ⋀
               </div>
            </div>
            <div id="nav-links-container">
               <Link to={"/account"} className="account-nav-link">
                  Twoje konta
               </Link>
               <Link to={"/account/transfer"} className="account-nav-link">
                  Przelew
               </Link>
               <Link to={"/account/history"} className="account-nav-link">
                  Historia transakcji
               </Link>
               <Link to={"/account/exchange"} className="account-nav-link">
                  Kantor
               </Link>
               <a
                  className="account-nav-link"
                  onClick={() => setModalActive(true)}
               >
                  Nowy rachunek
               </a>
            </div>
         </div>
         <NewAccountModal
            modalActive={modalActive}
            setModalActive={setModalActive}
         />
      </>
   );
};

export default AccountNavBar;
