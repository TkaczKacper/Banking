import { useState, useEffect } from "react";

const CurrencyExchange = () => {
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
         currency
         <div>XD?</div>
         <div className="cantor-container">
            <select>
               {Object.keys(data).map((keyName: any, index) => {
                  return <option value={keyName}>{keyName}</option>;
               })}
            </select>
         </div>
      </>
   );
};

export default CurrencyExchange;
