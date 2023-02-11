import { Link } from "react-router-dom";
import { useState } from "react";
import "./accountNavBar.css";
import NewAccountModal, {
   modalVariablesContext,
} from "../NewAccountModal/NewAccountModal";

const AccountNavBar = () => {
   const [modalActive, setModalActive] = useState(false);
   const displayModal = () => {
      setModalActive(true);
      console.log(modalActive);
   };
   return (
      <modalVariablesContext.Provider value={{ modalActive, setModalActive }}>
         <div className="accountNavBar">
            <div>
               <Link to="/account">Twoje sprawy</Link>
            </div>
            <div>Przelew</div>
            <div>Historia transakcji</div>
            <button onClick={displayModal}>Nowy rachunek</button>
            <NewAccountModal />
         </div>
      </modalVariablesContext.Provider>
   );
};

export default AccountNavBar;
