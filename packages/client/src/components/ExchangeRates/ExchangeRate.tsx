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
   const [size, setSize] = useState([1, 1]);
   const [result, setResult] = useState("0");
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

      const ratio: number = await GetExchangeRate(from, to);
      const exchangeResult = amount * ratio;
      setResult(exchangeResult.toFixed(2));
   };
   return (
      <div className="rate-container">
         <form
            className="cantor-form"
            id="rate-form"
            onSubmit={onSubmit}
            onChange={() => setResult("0")}
         >
            <label className="form-label" id="rate-check-label">
               Sprawdź kurs
            </label>
            <div className="form-currencies-container">
               <select
                  className="form-select"
                  name="fromCurrency"
                  size={size[0]}
                  onFocus={() => {
                     setSize([4, 1]);
                  }}
                  onChange={() => {
                     setSize([1, 1]);
                  }}
                  onBlur={() => {
                     setSize([1, 1]);
                  }}
               >
                  {Object.keys(avialableCurrencies).map(
                     (keyName: any, index) => {
                        return (
                           <option value={keyName} key={index}>
                              {keyName}
                           </option>
                        );
                     }
                  )}
               </select>
               <div className="form-arrow" id="vertical-arrow">
                  &dArr;
               </div>
               <div className="form-arrow" id="horizontal-arrow">
                  &rArr;
               </div>
               <select
                  className="form-select"
                  name="toCurrency"
                  size={size[1]}
                  onFocus={() => {
                     setSize([1, 4]);
                  }}
                  onChange={() => {
                     setSize([1, 1]);
                  }}
                  onBlur={() => {
                     setSize([1, 1]);
                  }}
               >
                  {Object.keys(avialableCurrencies).map(
                     (keyName: any, index) => {
                        return (
                           <option value={keyName} key={index}>
                              {keyName}
                           </option>
                        );
                     }
                  )}
               </select>
            </div>
            <div className="form-cantor-result">
               <div id="form-result-1">
                  <label className="form-label">Ilość</label>
                  <input
                     className="form-cantor-input"
                     id="rate-amount-input"
                     type="number"
                     placeholder="0.00"
                     min="0.01"
                     step="0.01"
                     name="amountInput"
                  ></input>
               </div>
               <div id="form-result-2">
                  <label className="form-label">Otrzymasz</label>
                  <input
                     className="form-cantor-input"
                     id="rate-result-input"
                     value={result}
                     disabled
                  ></input>
               </div>
            </div>
            <button className="form-cantor-button" type="submit">
               konwertuj
            </button>
         </form>
      </div>
   );
};

export default ExchangeRate;
