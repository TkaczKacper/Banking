import "./newAccountModal.css";
import { useState } from "react";
import Modal from "react-modal";
const NewAccountModal = () => {
   const [modalActive, setModalActive] = useState(true);

   function closeModal() {
      setModalActive(false);
   }

   return (
      <Modal isOpen={modalActive} onRequestClose={closeModal}>
         <form></form>
      </Modal>
   );
};

export default NewAccountModal;
