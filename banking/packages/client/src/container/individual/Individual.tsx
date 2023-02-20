import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components";
import "./individual.css";
import "../../components/NavBar/navbar.css";

const Individual = () => {
   return (
      <>
         <div className="individual-page-container">
            <div className="page-text-container">
               <p className="text-h1">Otwórz konto, zagrnij do 450zł</p>
               <p className="text-normal">
                  i oszczędzaj nawet na <strong>8%!</strong>
               </p>
               <p className="text-h2">Do konta mamy dla Ciebie jeszcze:</p>
               <ul className="text-ul">
                  <li>
                     dodatkową <strong>eKartę</strong> do zakupów w internecie
                  </li>
                  <li>
                     <strong>premię</strong> za polecenie konta znajomym
                  </li>
               </ul>
               <Link to="/register">
                  <button className="register-btn" id="register-individual">
                     załóż konto przez aplikację
                  </button>
               </Link>
               <p className="text-link">przeczytaj więcej</p>
            </div>
            <div className="page-image-container">
               <img
                  className="page-image"
                  src="https://www.mbank.pl/grafiki/ilustracje/indywidualny/retail_card_zero_cost-1.svg??__scale=h:74,w:200"
               />
            </div>
         </div>
         <Footer />
      </>
   );
};

export default Individual;
