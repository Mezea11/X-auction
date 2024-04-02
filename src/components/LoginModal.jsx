//import { right } from "@popperjs/core/index.js";
import LoginForm from "./LoginForm.jsx";
//Creates the modal component for the login form
export default function LoginModal({ closeModal }) {
  //closeModal function is passed as prop

  return (
    <>
      <div
        className="modal"
        id="LoginModal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "flex" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Log in</h5>
              {/* closeModal function called when clicking button */}
              <button
                type="button"
                style={{ marginLeft: "9rem" }}
                className="close btn btn-primary"
                onClick={closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
