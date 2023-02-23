import "./currencyExchange.css";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { on } from "events";

const CurrencyExchange = () => {
   const [cookie] = useCookies(["userId"]);
   if (!cookie.userId) window.location.href = "/login";
   const [accounts, setAccounts] = useState([]);
   const [message, setMessage] = useState("");
   const [size, setSize] = useState([1, 1]);

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
         const valuesToFetch = {
            currencyFrom: from,
            currencyTo: to,
            amount: amount,
            userId: cookie.userId,
         };
         fetch("http://192.168.1.100:5000/money/exchange", {
            method: "POST",
            credentials: "include",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(valuesToFetch),
         })
            .then((res) => res.json())
            .then((data) => {
               setMessage(data.details);
               if (data.status === "good") {
                  window.location.href = "/account";
               }
            });
      } else {
         if (amount) {
            setMessage("waluty muszą się różnić");
         } else {
            setMessage("wprowadź ilość");
         }
      }
   };

   return (
      <div className="exchange-container">
         <form
            className="exchange-form"
            onSubmit={submitHandler}
            onChange={() => setMessage("")}
         >
            <div className="form-cantor-currency-from">
               <label className="form-label" id="exchange-label-from">
                  Sprzedajesz
               </label>
               <select
                  name="fromCurrency"
                  className="form-select"
                  id="input-from"
                  size={size[0]}
                  onFocus={() => setSize([4, 1])}
                  onBlur={() => setSize([1, 1])}
                  onChange={() => setSize([1, 1])}
               >
                  {accounts.map((item: any) => {
                     return (
                        <option key={item.accountnumber} value={item.currency}>
                           {item.currency}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div className="form-cantor-currency-to">
               <label className="form-label" id="exchange-label-to">
                  Kupujesz
               </label>
               <select
                  name="toCurrency"
                  className="form-select"
                  id="input-to"
                  size={size[1]}
                  onFocus={() => setSize([1, 4])}
                  onBlur={() => setSize([1, 1])}
                  onChange={() => setSize([1, 1])}
               >
                  {accounts.map((item: any) => {
                     return (
                        <option key={item.accountnumber} value={item.currency}>
                           {item.currency}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div className="form-cantor-amount">
               <label className="form-label" id="exchange-label-amount">
                  Ilość
               </label>
               <input
                  className="form-cantor-input"
                  id="input-amount"
                  name="transactionAmount"
                  type="number"
                  min="0.01"
                  step="0.01"
               />
            </div>
            <button
               className="form-cantor-button"
               id="form-exchange-button"
               type="submit"
            >
               przewalutuj
            </button>
         </form>
         <div className="cantor-error" id="error">
            {message}
         </div>
      </div>
   );
};

export default CurrencyExchange;
