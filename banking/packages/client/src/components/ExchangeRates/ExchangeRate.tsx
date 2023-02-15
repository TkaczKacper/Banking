import { useState, useEffect } from "react";
import "./exchangeRate.css";

export const GetCurrencyData = () => {
   const [data, setData] = useState([]);

   const fetchData = async () => {
      await fetch("https://api.exchangerate.host/latest?base=pln")
         .then((res) => res.json())
         .then((result) => {
            setData(result.rates);
         });
   };

   useEffect(() => {
      fetchData();
   }, []);

   return data;
};

export const GetExchangeRate = async (from: string, to: string) => {
   return fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then((result) => {
         return result.result;
      });
};

const ExchangeRate = () => {
   const avialableCurrencies = GetCurrencyData();

   let conversionResult: number = 0;
   console.log(avialableCurrencies);

   function hideResult() {
      let container = document.getElementById("result") as HTMLDivElement;
      container.style.display = "none";
   }

   const onSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
         amountInput: { value: number };
         fromCurrency: { value: string };
         toCurrency: { value: string };
      };
      const amount = target.amountInput.value;
      const from = target.fromCurrency.value;
      const to = target.toCurrency.value;
      console.log(amount, from, to);

      const ratio: number = await GetExchangeRate(from, to);
      const exchangeResult = amount * ratio;

      const container = document.getElementById("result") as HTMLDivElement;
      container.style.display = "block";
      container.innerHTML = exchangeResult.toFixed(2);
   };
   return (
      <>
         <form onSubmit={onSubmit} onChange={hideResult}>
            <input type="number" name="amountInput"></input>
            <select name="fromCurrency">
               {Object.keys(avialableCurrencies).map((keyName: any, index) => {
                  return (
                     <option value={keyName} key={index}>
                        {keyName}
                     </option>
                  );
               })}
            </select>
            convert to:
            <select name="toCurrency">
               {Object.keys(avialableCurrencies).map((keyName: any, index) => {
                  return (
                     <option value={keyName} key={index}>
                        {keyName}
                     </option>
                  );
               })}
            </select>
            <button type="submit">konwertuj</button>
         </form>
         <div id="result"></div>
      </>
   );
};

export default ExchangeRate;
