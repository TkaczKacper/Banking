import "./transactionHistory.css";
import { AccountNavBar } from "../../components";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

const TransactionHistory = () => {
   const [cookie] = useCookies(["userId", "username"]);
   if (!cookie.userId) window.location.href = "/login";
   const [transactions, setTransactions] = useState([Object]);

   const fetchData = async () => {
      return await fetch(
         `http://192.168.1.100:5000/account/history/${cookie.username}`
      )
         .then((res) => res.json())
         .then((data) => {
            return setTransactions(data.transactions);
         });
   };

   useEffect(() => {
      fetchData();
   }, []);
   if (transactions) {
      return (
         <>
            <AccountNavBar />
            <table>
               <thead>
                  <tr>
                     <th>Nadawca</th>
                     <th>Odbiorca</th>
                     <th>wartosc</th>
                     <th>Saldo po transakcji</th>
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
   } else {
      return (
         <>
            <AccountNavBar />
            <div className="account-message">
               Nie masz jeszcze żadnej opreacji w historii.
            </div>
         </>
      );
   }
};

export default TransactionHistory;
