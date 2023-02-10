import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AccountNavBar } from "../../components";
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
         <AccountNavBar />
         {accounts.length >= 1 ? (
            <table>
               <thead>
                  <td>numer konta</td>
                  <td>stan konta</td>
                  <td>waluta</td>
               </thead>
               <tbody>
                  {accounts.map((item: any) => {
                     return (
                        <tr key={item.accountnumber}>
                           <td>{item.accountnumber}</td>
                           <td>{item.accountbalance}</td>
                           <td>{item.currency}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         ) : (
            <div>accounts not found</div>
         )}
      </>
   );
};

export default Account;
