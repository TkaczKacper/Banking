import React from "react";
import { Footer } from "../../components";
import './individual.css';

const Individual = () => {
     return (
          <>
               <div className="individual-page-container">
                    <div className="container">
                         <div className="page-text-container">

                         </div>
                         <div className="page-image-container">
                              <img className="page-image" src="https://www.mbank.pl/grafiki/ilustracje/indywidualny/retail_card_zero_cost-1.svg??__scale=h:74,w:200" />
                         </div>
                    </div>
               </div>
               <Footer />
          </>
     );
};

export default Individual;
