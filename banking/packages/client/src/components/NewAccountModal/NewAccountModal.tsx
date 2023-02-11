import "./newAccountModal.css";
import { createContext, useContext } from "react";
import Modal from "react-modal";

export const modalVariablesContext = createContext({
   modalActive: false,
   setModalActive: (c: boolean) => {},
});

const NewAccountModal = () => {
   const { modalActive, setModalActive } = useContext(modalVariablesContext);
   function closeModal() {
      setModalActive(false);
   }
   console.log("test");
   return (
      <Modal
         isOpen={modalActive}
         onRequestClose={closeModal}
         ariaHideApp={false}
      >
         <button onClick={closeModal}>click</button>
         <form></form>
      </Modal>
   );
};
export default NewAccountModal;
