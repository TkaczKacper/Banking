import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AccountNavBar, CloseAccountModal } from "../../components";
import "./account.css";

const Account = () => {
  const [cookie] = useCookies(["userId"]);
  const [accounts, setAccounts] = useState([]);
  const [closeAccountModalActive, setCloseAccountModalActive] = useState(false);
  const [accountToClose, setAccountToClose] = useState(0);

  if (!cookie.userId) window.location.href = "/login";
  const fetchData = async () => {
    return await fetch(`http://localhost:5000/account/${cookie.userId}`, {
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
  console.log(accounts);

  return (
    <>
      <AccountNavBar />
      {accounts.length >= 1 ? (
        <table className="account-table">
          <thead>
            <tr className="thead-row">
              <th className="thead-item" />
              <th className="thead-item" id="th-number">
                numer konta
              </th>
              <th className="thead-item" id="th-balance">
                stan konta
              </th>
            </tr>
          </thead>
          <tbody className="account-table-body">
            {accounts.map((item: any, index) => {
              return (
                <tr
                  key={item.accountnumber}
                  className="tbody-row"
                  onClick={() => {
                    if (item.accountbalance == 0.0) {
                      setAccountToClose(item.accountnumber);
                      setCloseAccountModalActive(true);
                    }
                  }}
                >
                  <td className="tbody-item" id="account-tb-id">
                    {index + 1}.
                  </td>
                  <td className="tbody-item" id="account-tb-number">
                    {item.accountnumber}
                  </td>
                  <td className="tbody-item" id="account-tb-balance">
                    {item.currency} {item.accountbalance}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="account-message">Nie masz jeszcze żadnego konta.</div>
      )}
      <CloseAccountModal
        closeAccountModalActive={closeAccountModalActive}
        setCloseAccountModalActive={setCloseAccountModalActive}
        accountNumber={accountToClose}
      />
    </>
  );
};

export default Account;
