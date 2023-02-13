import { useState, useEffect } from "react";
import { AccountNavBar, ExchangeRate } from "../../components";
import "./bankCurrency.css";

const BankCurrency = () => {
   const [data, setData] = useState([]);

   const fetchData = async () => {
      await fetch("https://api.exchangerate.host/latest?base=pln")
         .then((res) => res.json())
         .then((result) => {
            console.log(result.rates);
            setData(result.rates);
            console.log(typeof data);
         });
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <>
         <AccountNavBar />
         <div className="cantor-container">
            <div className="cantor-left">?XD n XD?</div>
            <div className="cantor-right">
               <ExchangeRate data={data} />
            </div>
         </div>
      </>
   );
};

export default BankCurrency;
