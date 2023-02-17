import "./transactionHistory.css";
import { AccountNavBar } from "../../components";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

const TransactionHistory = () => {
   const [cookie] = useCookies(["userId"]);
   const [transactions, setTransactions] = useState([Object]);

   const fetchData = async () => {
      return await fetch(
         `http://192.168.1.100:5000/account/history/${cookie.userId}`
      )
         .then((res) => res.json())
         .then((data) => {
            return setTransactions(data.transactions);
         });
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <>
         <AccountNavBar />
         <table>
            <thead>
               <tr>
                  <th>Nadawca</th>
                  <th>Odbiorca</th>
                  <th>wartosc</th>
                  <th>Stan konta po transackji</th>
                  <th>Data</th>
               </tr>
            </thead>
            <tbody>
               {transactions.map((transaction: any, index) => {
                  return (
                     <tr key={index}>
                        <td>{transaction.senderuser}</td>
                        <td>{transaction.receiveruser}</td>
                        <td>{transaction.transactionamount}</td>
                        <td>{transaction.senderbalance}</td>
                        <td>{transaction.transactiondate}</td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </>
   );
};

export default TransactionHistory;
