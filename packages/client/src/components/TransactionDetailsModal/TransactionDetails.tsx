import "./transactionDetails.css";
import Modal from "react-modal";
import { useCookies } from "react-cookie";
import { transactionType } from "../Transactions/Transactions";

type props = {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: transactionType;
};

const TransactionDetails = (props: props) => {
  const [cookie] = useCookies(["username"]);
  function closeModal() {
    props.setModalActive(false);
  }
  const transaction = props.transaction;

  const date = new Date(transaction.transactiondate).toLocaleDateString();
  const time = new Date(transaction.transactiondate).toLocaleTimeString();
  return (
    <>
      <Modal
        isOpen={props.modalActive}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="transaction-details-modal"
      >
        <button onClick={closeModal} id="close-modal-button">
          X
        </button>
        <div className="transaction-details-content">
          <div className="details-id">ID transakcji: {transaction.id}</div>

          {transaction.senderuser === transaction.receiveruser ? (
            <>
              <div className="details-type">
                <div>Przewalutowanie:</div>
                {transaction.sendercurrency} &rarr;{" "}
                {transaction.receivercurrency}
              </div>
              <div className="details-amount">
                <div>Kwota:</div>
                {transaction.sendercurrency + " "}
                {transaction.transactionamount}
              </div>
              <div className="details-balance">
                Saldo po transackcji:
                <div id="sender-balance">
                  {transaction.sendercurrency + " "}
                  {transaction.senderaccountbalance}
                </div>
                <div id="receiver-balance">
                  {transaction.receivercurrency + " "}
                  {transaction.receiveraccountbalance}
                </div>
              </div>
            </>
          ) : cookie.username === transaction.receiveruser ? (
            <>
              <div className="details-user">Od: {transaction.senderuser}</div>
              <div className="details-amount">
                <div>Kwota:</div>
                {transaction.sendercurrency + " "}
                {transaction.transactionamount}
              </div>
              <div className="details-balance">
                <div>Saldo po transakcji:</div>
                {transaction.receivercurrency + " "}
                {transaction.receiveraccountbalance}
              </div>
            </>
          ) : (
            <>
              <div className="details-user">Do: {transaction.receiveruser}</div>
              <div className="details-amount">
                <div>Kwota:</div>
                {transaction.sendercurrency + " "}
                {transaction.transactionamount}
              </div>
              <div className="details-balance">
                <div>Saldo po transakcji:</div>
                {transaction.sendercurrency + " "}
                {transaction.senderaccountbalance}
              </div>
            </>
          )}
          <div className="details-datetime">
            <div>Data transakcji:</div>
            {time} {date}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TransactionDetails;
