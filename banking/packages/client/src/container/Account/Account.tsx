import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./account.css";

const Account = () => {
   const [cookie] = useCookies(["userId"]);
   const [accounts, setAccounts] = useState([]);

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
         <div>hi </div>
         {accounts.length >= 1 ? (
            accounts.map((item: any) => {
               return <li key={item.accountnumber}>{item.ownerid}</li>;
            })
         ) : (
            <div>accounts not found</div>
         )}
      </>
   );
};

export default Account;
