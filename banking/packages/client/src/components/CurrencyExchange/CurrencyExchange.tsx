import "./currencyExchange.css";
import { GetExchangeRate } from "../ExchangeRates/ExchangeRate";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

const CurrencyExchange = () => {
   const [cookie] = useCookies(["userId"]);
   const [accounts, setAccounts] = useState([]);
   const [message, setMessage] = useState("");

   const fetchData = async () => {
      return await fetch(`http://192.168.1.100:5000/account/${cookie.userId}`, {
         method: "GET",
         credentials: "include",
         headers: {
            "Content-Type": "application/json",
         },
      })
         .catch((err) => {
            console.log(err);
         })
         .then((result) => {
            if (!result || !result.ok || result.status >= 400) {
               throw new Error("Something went wrong, try again later.");
            }
            return result.json();
         })
         .then((data) => {
            return setAccounts(data.accounts);
         });
   };

   useEffect(() => {
      fetchData();
   }, []);

   const submitHandler = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
         fromCurrency: { value: string };
         toCurrency: { value: string };
         transactionAmount: { value: string };
      };
      const from = target.fromCurrency.value;
      const to = target.toCurrency.value;
      const amount = target.transactionAmount.value;
      if (from != to && amount) {
         console.log(from, to, amount);
      } else {
         if (amount) {
            setMessage("waluty musza sie roznic");
         } else {
            setMessage("wprowadz ilosc");
         }
      }
   };
   return (
      <div>
         CurrencyExchange
         <form onSubmit={submitHandler} onChange={() => setMessage("")}>
            <select name="fromCurrency">
               {accounts.map((item: any) => {
                  return (
                     <option key={item.accountnumber} value={item.currency}>
                        {item.currency}
                     </option>
                  );
               })}
            </select>
            <input
               name="transactionAmount"
               type="number"
               min="0.01"
               step="0.01"
            />
            <select name="toCurrency">
               {accounts.map((item: any) => {
                  return (
                     <option key={item.accountnumber} value={item.currency}>
                        {item.currency}
                     </option>
                  );
               })}
            </select>
            <button type="submit">przewalutuj</button>
         </form>
         <div id="error">{message}</div>
      </div>
   );
};

export default CurrencyExchange;
