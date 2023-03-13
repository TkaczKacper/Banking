import "./transactions.css";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { TransactionDetailsModal } from "..";

export type transactionsType = { transactions: [transactionType] };
export type transactionType = {
  id: number;
  receiveraccount: number;
  receiveraccountbalance: string;
  receivercurrency: string;
  receiveruser: string;
  senderaccount: number;
  senderaccountbalance: string;
  sendercurrency: string;
  senderuser: string;
  transactionamount: string;
  transactiondate: Date;
};

const Transactions = (currentTransactions: any) => {
  console.log(currentTransactions);
  const [cookie] = useCookies(["userId", "username"]);
  const transactions: [transactionType] = currentTransactions.transactions;
  const [detailsTransaction, setDetailsTransaction] =
    useState<transactionType>(Object);
  const [detailsActive, setDetailsActive] = useState(false);

  return (
    <>
      {transactions.length >= 1 ? (
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
            {transactions.map((transaction: transactionType, index) => {
              const date = new Date(
                transaction.transactiondate
              ).toLocaleDateString();
              const time = new Date(
                transaction.transactiondate
              ).toLocaleTimeString();
              if (transaction.senderuser === transaction.receiveruser) {
                return (
                  <tr
                    key={index}
                    className="tbody-row"
                    onClick={() => {
                      setDetailsActive(true);
                      setDetailsTransaction(transaction);
                    }}
                  >
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
                  <tr
                    key={index}
                    className="tbody-row"
                    onClick={() => {
                      setDetailsActive(true);
                      setDetailsTransaction(transaction);
                    }}
                  >
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
                  <tr
                    key={index}
                    className="tbody-row"
                    onClick={() => {
                      setDetailsActive(true);
                      setDetailsTransaction(transaction);
                    }}
                  >
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
      ) : (
        <div className="account-message">
          Nie masz jeszcze żadnej opreacji w historii.
        </div>
      )}{" "}
      <TransactionDetailsModal
        modalActive={detailsActive}
        setModalActive={setDetailsActive}
        transaction={detailsTransaction}
      />
    </>
  );
};

export default Transactions;
