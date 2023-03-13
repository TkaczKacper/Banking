import "./closeAccountModal.css";
import Modal from "react-modal";

type ModalProps = {
  closeAccountModalActive: boolean;
  setCloseAccountModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  accountNumber: number;
};

const CloseAccountModal = (props: ModalProps) => {
  function closeModal() {
    props.setCloseAccountModalActive(false);
  }
  return (
    <>
      <Modal
        isOpen={props.closeAccountModalActive}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="new-acc-modal"
      >
        <button onClick={closeModal} id="close-modal-button">
          X
        </button>
        <div
          className="close-acc-modal-container"
          id="close-acc-modal-container"
        >
          <p className="close-acc-modal-header">
            Czy chcesz usunąć ten rachunek?
          </p>
          <div className="close-acc-modal-form-container">
            <form
              className="close-acc-modal-form"
              onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                fetch("http://localhost:5000/account/delete", {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ accountnumber: props.accountNumber }),
                })
                  .then((result) => {
                    if (!result || !result.ok || result.status >= 400) {
                      throw new Error("Something went wrong, try again later.");
                    } else {
                      return result.json();
                    }
                  })
                  .then((data) => {
                    const container = document.getElementById(
                      "close-acc-modal-message"
                    ) as HTMLDivElement;
                    const formContainer = document.getElementById(
                      "close-acc-modal-container"
                    ) as HTMLDivElement;
                    container.innerHTML = data.details;
                    if (data.status === "success") {
                      formContainer.style.display = "none";
                      setTimeout(() => {
                        closeModal();
                        window.location.href = "/account";
                      }, 1000);
                    }
                  });
              }}
            >
              <button
                type="submit"
                className="close-acc-button"
                id="close-acc-button-yes"
              >
                Tak
              </button>
            </form>
            <button
              onClick={closeModal}
              className="close-acc-button"
              id="close-acc-button-no"
            >
              Nie
            </button>
          </div>
        </div>
        <div id="close-acc-modal-message"></div>
      </Modal>
    </>
  );
};

export default CloseAccountModal;
