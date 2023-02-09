import { useCookies } from "react-cookie";
import "./account.css";

const Account = () => {
   const [cookie] = useCookies(["userId"]);
   fetch(`http://192.168.1.100:5000/account/accounts`, {
      method: "POST",
      credentials: "include",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: cookie.userId }),
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
         data.accounts;
      });

   return (
      <>
         <div>hi </div>
      </>
   );
};

export default Account;
