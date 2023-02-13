import { useState } from "react";
import "./exchangeRate.css";

type props = {
   data: never[];
};

const ExchangeRate = (props: props) => {
   const [moneyAmount, setMoneyAmount] = useState(0);
   const [currency, setCurrency] = useState(0);
   let conversionResult: number = 0;

   function showResult() {
      const possibleValue = Object.values(props.data).at(currency);
      if (possibleValue) conversionResult = moneyAmount / possibleValue;
      let container = document.getElementById("result") as HTMLDivElement;
      container.innerHTML = conversionResult.toFixed(2) + "PLN";
      container.style.display = "block";
   }

   function hideResult() {
      let container = document.getElementById("result") as HTMLDivElement;
      container.style.display = "none";
   }

   return (
      <>
         <form
            onSubmit={(e) => {
               e.preventDefault();
               showResult();
            }}
            onChange={hideResult}
         >
            <input
               type="number"
               name="amountInput"
               onChange={(e) => {
                  setMoneyAmount(Number(e.target.value));
               }}
            ></input>
            <select
               name="currency"
               onChange={(e) => {
                  setCurrency(Number(e.target.value));
               }}
            >
               {Object.keys(props.data).map((keyName: any, index) => {
                  return <option value={index}>{keyName}</option>;
               })}
            </select>
         </form>
         <div id="result">{conversionResult}</div>
      </>
   );
};

export default ExchangeRate;
