import {
   AccountNavBar,
   ExchangeRate,
   CurrencyExchange,
} from "../../components";
import "./bankCurrency.css";

const BankCurrency = () => {
   const exchangeHandler = () => {
      const menuDiv = document.getElementById("cantor-menu") as HTMLDivElement;
      const cantorDiv = document.getElementById(
         "cantor-container"
      ) as HTMLDivElement;
      const exchangeDiv = document.getElementById(
         "cantor-exchange"
      ) as HTMLDivElement;
      cantorDiv.style.display = "flex";
      menuDiv.style.display = "none";
      exchangeDiv.style.display = "flex";
   };
   const rateHandler = () => {
      const menuDiv = document.getElementById("cantor-menu") as HTMLDivElement;
      const cantorDiv = document.getElementById(
         "cantor-container"
      ) as HTMLDivElement;
      const rateDiv = document.getElementById("cantor-rate") as HTMLDivElement;
      cantorDiv.style.display = "flex";
      rateDiv.style.display = "flex";
      menuDiv.style.display = "none";
   };
   const showMenu = () => {
      const menuDiv = document.getElementById("cantor-menu") as HTMLDivElement;
      const cantorDiv = document.getElementById(
         "cantor-container"
      ) as HTMLDivElement;
      const exchangeDiv = document.getElementById(
         "cantor-exchange"
      ) as HTMLDivElement;
      const rateDiv = document.getElementById("cantor-rate") as HTMLDivElement;
      menuDiv.style.display = "flex";
      rateDiv.style.display = "none";
      exchangeDiv.style.display = "none";
      cantorDiv.style.display = "none";
   };
   return (
      <>
         <AccountNavBar />
         <div className="cantor-menu" id="cantor-menu">
            <p id="p-1">Witaj w kantorze bankowym.</p>
            <p id="p-2">Co chcesz dziś zrobić?</p>
            <div className="cantor-buttons-container">
               <div id="exchange-button" onClick={exchangeHandler}>
                  Wymień
               </div>
               <div id="rate-button" onClick={rateHandler}>
                  Sprawdź kurs
               </div>
            </div>
         </div>
         <div className="cantor-container" id="cantor-container">
            <div className="cantor-exchange" id="cantor-exchange">
               <button onClick={showMenu} className="show-menu-button">
                  &#8617; Powrót
               </button>
               <CurrencyExchange />
            </div>
            <div className="cantor-rate" id="cantor-rate">
               <button onClick={showMenu} className="show-menu-button">
                  &#8617; Powrót
               </button>
               <ExchangeRate />
            </div>
         </div>
      </>
   );
};

export default BankCurrency;
