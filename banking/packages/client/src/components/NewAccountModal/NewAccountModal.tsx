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

   let message: string = "";

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

               const valuesToFetch = {
                  currency: currency,
                  userId: cookie.userId,
               };
               fetch("http://192.168.1.100:5000/account/new", {
                  method: "POST",
                  credentials: "include",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify(valuesToFetch),
               })
                  .then((result) => {
                     if (!result || !result.ok || result.status >= 400) {
                        throw new Error(
                           "Something went wrong, try again later."
                        );
                     } else {
                        return result.json();
                     }
                  })
                  .then((data) => {
                     message = data.details;
                     const container = document.getElementById(
                        "error"
                     ) as HTMLDivElement;
                     container.innerHTML = data.details;
                  });
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
            <div id="error"></div>
         </form>
      </Modal>
   );
};
export default NewAccountModal;
