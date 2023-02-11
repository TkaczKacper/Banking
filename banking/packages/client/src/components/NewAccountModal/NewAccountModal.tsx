import "./newAccountModal.css";
import Modal from "react-modal";

type props = {
   modalActive: boolean;
   setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewAccountModal = (props: props) => {
   function closeModal() {
      props.setModalActive(false);
   }
   return (
      <Modal
         isOpen={props.modalActive}
         onRequestClose={closeModal}
         ariaHideApp={false}
      >
         <button onClick={closeModal}>click</button>
         <form></form>
      </Modal>
   );
};
export default NewAccountModal;
