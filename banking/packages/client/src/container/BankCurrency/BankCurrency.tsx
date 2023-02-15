import {
   AccountNavBar,
   ExchangeRate,
   CurrencyExchange,
} from "../../components";
import "./bankCurrency.css";

const BankCurrency = () => {
   return (
      <>
         <AccountNavBar />
         <div className="cantor-container">
            <div className="cantor-left">
               <CurrencyExchange />
            </div>

            <div className="cantor-right">
               <ExchangeRate />
            </div>
         </div>
      </>
   );
};

export default BankCurrency;
