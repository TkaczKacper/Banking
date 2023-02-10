import { Link } from "react-router-dom";
import "./accountNavBar.css";
import NewAccountModal from "../NewAccountModal/NewAccountModal";
import { useState } from "react";
import Modal from "react-modal";

const AccountNavBar = () => {
   const [isModalOpen, setModalOpen] = useState(false);
   return (
      <div className="accountNavBar">
         <div>
            <Link to="/account">Twoje sprawy</Link>
         </div>
         <div>Przelew</div>
         <div>Historia transakcji</div>
         <button onClick={() => setModalOpen(true)}>Nowy rachunek</button>
         <Modal isOpen={isModalOpen}>
            <button onClick={() => setModalOpen(false)} className="modalButton">
               X
            </button>
            <NewAccountModal />
         </Modal>
      </div>
   );
};

export default AccountNavBar;
