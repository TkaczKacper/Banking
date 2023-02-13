import "./newAccountModal.css";
import Modal from "react-modal";
import { GetCurrencyData } from "../../container/BankCurrency/BankCurrency";
import { useCookies } from "react-cookie";

type props = {
   modalActive: boolean;
   setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewAccountModal = (props: props) => {
   const data = GetCurrencyData();
   const [cookie] = useCookies(["userId"]);

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
         <form
            onSubmit={(e: React.SyntheticEvent) => {
               e.preventDefault();
               const target = e.target as typeof e.target & {
                  currency: { value: string };
               };
               const currency = target.currency.value;
               console.log(currency);
            }}
         >
            <select name="currency">
               {Object.keys(data).map((keyName: string, index) => {
                  return (
                     <option key={index} value={keyName}>
                        {keyName}
                     </option>
                  );
               })}
            </select>
            <button type="submit" id="open-account-btn">
               otworz rachunek
            </button>
         </form>
      </Modal>
   );
};
export default NewAccountModal;
