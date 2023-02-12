import { useState, useEffect } from "react";

const CurrencyExchange = () => {
   const [data, setData] = useState([]);
   const [moneyAmount, setMoneyAmount] = useState(0);
   const [currency, setCurrency] = useState(0);
   let conversionResult: number = 0;
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

   function showResult() {
      const possibleValue = Object.values(data).at(currency);
      if (possibleValue) conversionResult = moneyAmount / possibleValue;
      let container = document.getElementById("result") as HTMLDivElement;
      container.innerHTML = conversionResult.toFixed(2) + "PLN";
   }

   return (
      <>
         currency
         <div>XD?</div>
         <div className="cantor-container">
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  showResult();
               }}
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
                  {Object.keys(data).map((keyName: any, index) => {
                     return <option value={index}>{keyName}</option>;
                  })}
               </select>
            </form>
         </div>
         <div id="result"></div>
      </>
   );
};

export default CurrencyExchange;
