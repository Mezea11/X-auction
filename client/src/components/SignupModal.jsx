import SignupForm from "./SignupForm.jsx";
import { useState } from "react";
//Creates the modal for the signup functionality
export default function SignupModal({ closeModal }) {
  //closeModal function passed as a prop
  const [isSuccess, setIsSuccess] = useState(false);
  //adds new ueser obejct to array of users in db.json
  const postNewUser = async (id, username, email, password) => {
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
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add new user");
      }
    } catch (error) {
      console.error("Error posting new user:", error);
    }
    setIsSuccess(true); //changes value for isSuccess variable to show <p> element
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
                style={{ marginLeft: "auto" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* adds signup form component with function postNewUser to the body of the modal */}
              <SignupForm onSubmit={postNewUser} />
              {/* element shows if isSuccess = true */}
              {isSuccess && (
                <p
                  style={{
                    color: "green",
                    marginTop: "1rem",
                  }}
                >
                  Signup successful!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
