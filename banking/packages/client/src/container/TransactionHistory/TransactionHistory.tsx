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
   console.log(transactions);
   if (transactions) {
      return (
         <>
            <AccountNavBar />
            <table className="transaction-history-table">
               <thead>
                  <tr className="thead-row">
                     <th className="thead-item" id="history-th-type">
                        Typ
                     </th>
                     <th className="thead-item" id="history-th-value">
                        Wartość
                     </th>
                     <th className="thead-item" id="history-th-date">
                        Data
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {transactions.map((transaction: any, index) => {
                     const date = new Date(
                        transaction.transactiondate
                     ).toLocaleDateString();
                     const time = new Date(
                        transaction.transactiondate
                     ).toLocaleTimeString();
                     if (transaction.senderuser === transaction.receiveruser) {
                        return (
                           <tr key={index} className="tbody-row">
                              <td className="tb-item" id="history-tb-type">
                                 Przewalutowanie
                              </td>
                              <td className="tb-item" id="history-tb-value">
                                 {transaction.sendercurrency + " "}
                                 {transaction.transactionamount}
                              </td>
                              <td className="tb-item" id="history-tb-date">
                                 <div className="history-tb-date-value">
                                    <div id="tb-date-time">{time}</div>
                                    <div id="tb-date-date">{date}</div>
                                 </div>
                              </td>
                           </tr>
                        );
                     }
                     if (transaction.senderuser === cookie.username) {
                        return (
                           <tr key={index} className="tbody-row">
                              <td className="tb-item" id="history-tb-type">
                                 Wychodzący
                              </td>
                              <td className="tb-item" id="history-tb-value">
                                 {transaction.sendercurrency + " "}
                                 {transaction.transactionamount}
                              </td>
                              <td className="tb-item" id="history-tb-date">
                                 <div className="history-tb-date-value">
                                    <div id="tb-date-time">{time}</div>
                                    <div id="tb-date-date">{date}</div>
                                 </div>
                              </td>
                           </tr>
                        );
                     } else {
                        return (
                           <tr key={index} className="tbody-row">
                              <td className="tb-item" id="history-tb-type">
                                 Przychodzący
                              </td>
                              <td className="tb-item" id="history-tb-value">
                                 {transaction.receivercurrency + " "}
                                 {transaction.transactionamount}
                              </td>
                              <td className="tb-item" id="history-tb-date">
                                 <div className="history-tb-date-value">
                                    <div id="tb-date-time">{time}</div>
                                    <div id="tb-date-date">{date}</div>
                                 </div>
                              </td>
                           </tr>
                        );
                     }
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
