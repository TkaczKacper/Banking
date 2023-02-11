import { Link } from "react-router-dom";
import { useState } from "react";
import "./accountNavBar.css";
import NewAccountModal from "../NewAccountModal/NewAccountModal";

const AccountNavBar = () => {
   const [modalActive, setModalActive] = useState(false);
   return (
      <>
         <div className="accountNavBar">
            <div>
               <Link to="/account">Twoje sprawy</Link>
            </div>
            <div>Przelew</div>
            <div>Historia transakcji</div>
            <Link to={"/account/exchange"}>Kantor</Link>
            <button onClick={() => setModalActive(true)}>Nowy rachunek</button>
         </div>
         <NewAccountModal
            modalActive={modalActive}
            setModalActive={setModalActive}
         />
      </>
   );
};

export default AccountNavBar;
