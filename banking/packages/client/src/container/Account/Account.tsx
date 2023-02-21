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
            <table className="account-table">
               <thead>
                  <tr>
                     <th />
                     <th className="th-item" id="th-number">
                        numer konta
                     </th>
                     <th className="th-item" id="th-balance">
                        stan konta
                     </th>
                  </tr>
               </thead>
               <tbody className="account-table-body">
                  {accounts.map((item: any, index) => {
                     return (
                        <tr key={item.accountnumber} className="tbody-row">
                           <td className="tb-item" id="tb-id">
                              {index + 1}.
                           </td>
                           <td className="tb-item" id="tb-number">
                              {item.accountnumber}
                           </td>
                           <td className="tb-item" id="tb-balance">
                              {item.currency} {item.accountbalance}
                           </td>
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
