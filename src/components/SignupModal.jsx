import SignupForm from "./SignupForm.jsx";
import { useState } from "react";

export default function SignupModal({ closeModal }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const postNewUser = async ( id, username, email, password ) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          username,
          email,
          password
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add new user");
      }
     
    } catch (error) {
      console.error("Error posting new user:", error);
    }
    setIsSuccess(true);
  };

  return (
    <>
      <div
        className="modal"
        id="signupModal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "flex" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign Up</h5>
              <button
                type="button"
                className="close btn btn-primary"
                onClick={closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <SignupForm onSubmit={postNewUser}  />
              {isSuccess && <p style={{color: "green", marginTop: "1rem"}}>Signup successful!</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
