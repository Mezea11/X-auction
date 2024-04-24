import SignupForm from "./SignupForm.jsx";
import { useState, useEffect } from "react";
import bcrypt from "bcryptjs"; // Import library encryption algorithm

//Creates the modal for the signup functionality
export default function SignupModal({ closeModal }) {
  //closeModal function passed as a prop
  const [isSuccess, setIsSuccess] = useState(false);
  const [notSuccess, setNotSuccess] = useState(false);
  //adds new ueser obejct to array of users in db.json
  const postNewUser = async (id, username, email, password) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: hashedPassword, //sending hashed password
        }),
      });

      if (!response.ok) {
        setNotSuccess(true);
        setIsSuccess(false);
        throw new Error("Username already taken");
      } else if (response.ok) {
        setIsSuccess(true); //changes value for isSuccess variable to show <p> element
        setNotSuccess(false);
      }
    } catch (error) {
      console.error("Error posting new user:", error);
    }
  };

    //close modal when clicking outside modal
    const handleOutsideClick = (event) => {
      if (event.target.id === "signupModal") {
        // Close the modal only if the click occurs outside the modal content
        closeModal();
      }
    };
    //runs after main function renders for the first time
    useEffect(() => {
      document.addEventListener("click", handleOutsideClick);
      //adds event listener on click for entire document that runs handleOutsideClick
  
      return () => {
        document.removeEventListener("click", handleOutsideClick);
        //removes eventlistener when modal is closed and its not needed anymore
      };
    }, [closeModal]);

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
              {notSuccess && (
                <p
                  style={{
                    color: "red",
                    marginTop: "1rem",
                  }}
                >
                  Username or Email already in use!
                </p>
              )}
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