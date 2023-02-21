import { AccountNavBar } from "../../components";
import "./moneyTransfer.css";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

const MoneyTransfer = () => {
   const [cookie] = useCookies(["userId"]);
   const [accounts, setAccounts] = useState([]);
   const container = document.getElementById(
      "transfer-message"
   ) as HTMLDivElement;

   const fetchData = async () => {
      return await fetch(`http://192.168.1.100:5000/account/${cookie.userId}`, {
         method: "GET",
         credentials: "include",
         headers: {
            "Content-Type": "application/json",
         },
      })
         .catch((err) => {
            console.log(err);
         })
         .then((result) => {
            if (!result || !result.ok || result.status >= 400) {
               throw new Error("Something went wrong, try again later.");
            }
            return result.json();
         })
         .then((data) => {
            return setAccounts(data.accounts);
         });
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <>
         <AccountNavBar />
         <div>
            <form
               id="transfer-form"
               onChange={() => (container.innerHTML = "")}
               onSubmit={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  const target = e.target as typeof e.target & {
                     sender: { value: string };
                     amount: { value: number };
                     receiver: { value: number };
                  };
                  const senderAccount = target.sender.value.split(",", 2);
                  const amount = target.amount.value;
                  const receiverAccount = target.receiver.value;
                  const valuesToFetch = {
                     userId: cookie.userId,
                     senderAccount: senderAccount[0],
                     currency: senderAccount[1],
                     amount: amount,
                     receiverAccount: receiverAccount,
                  };
                  fetch("http://192.168.1.100:5000/money/transfer", {
                     method: "POST",
                     credentials: "include",
                     headers: {
                        "Content-Type": "application/json",
                     },
                     body: JSON.stringify(valuesToFetch),
                  })
                     .then((res) => res.json())
                     .then((data) => {
                        console.log(data);
                        container.style.visibility = "block";
                        container.innerHTML = data.details;

                        if (data.details === "sent") {
                           const form = document.getElementById(
                              "transfer-form"
                           ) as HTMLFormElement;
                           form.style.display = "none";
                           setTimeout(() => {
                              window.location.href = "/account";
                           }, 1000);
                        }
                     });
               }}
            >
               <div className="currency-container">
                  <label id="select-label">Waluta: </label>
                  <div className="select-container">
                     <select name="sender" id="currency-input">
                        {accounts.map((item: any) => {
                           return (
                              <option
                                 key={item.accountnumber}
                                 value={[item.accountnumber, item.currency]}
                              >
                                 {item.currency}
                              </option>
                           );
                        })}
                     </select>
                  </div>
               </div>
               <div className="transfer-amount-container">
                  <label id="amount-label">Kwota: </label>
                  <input
                     id="amount-input"
                     name="amount"
                     type="number"
                     min="0.01"
                     step="0.01"
                     placeholder="wprowadz ilosc..."
                  ></input>
               </div>
               <div className="reciever-container">
                  <label id="receiver-label">Odbiorca: </label>
                  <input
                     id="receiver-input"
                     name="receiver"
                     type="number"
                     placeholder="numer konta odbiorcy"
                  />
               </div>
               <div id="transfer-message"></div>
               <button type="submit" id="form-btn">
                  submit
               </button>
            </form>
         </div>
      </>
   );
};

export default MoneyTransfer;
