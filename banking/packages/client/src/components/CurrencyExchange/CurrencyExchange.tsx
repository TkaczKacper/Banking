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
         {Object.keys(data).map((keyName: any, index) => {
            return (
               <li key={index}>
                  {keyName}
                  {data[keyName]}
               </li>
            );
         })}
      </>
   );
};

export default CurrencyExchange;
