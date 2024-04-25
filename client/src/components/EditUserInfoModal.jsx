import EditUserForm from "./EditUserInfoForm.jsx";
import { useState, useContext } from "react";
import bcrypt from "bcryptjs"; // Import library encryption algorithm
import { GlobalContext } from "../GlobalContext";

//Creates the modal for the edit user functionality
export default function EditUserModal({ closeModal }) {
  //closeModal function passed as a prop
  const { user } = useContext(GlobalContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [notSuccess, setNotSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //adds new ueser obejct to array of users in db.json
  const updateUser = async (formData) => {
    try {
      // If both email and new password are empty, display error message
      if (!formData.email && !formData.newPassword) {
        setErrorMessage("Nothing to change");
        setIsSuccess(false);
        return;
      }

      if (formData.email) {
        formData.email = formData.email.toLowerCase();
      } else {
        // Remove newPassword field if it's empty
        delete formData.email;
      }

      // If newPassword field is not empty, hash it
      if (formData.newPassword) {
        formData.newPassword = await bcrypt.hash(formData.newPassword, 10);
      } else {
        // Remove newPassword field if it's empty
        delete formData.newPassword;
      }

      const response = await fetch("/api/edituser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setNotSuccess(true);
        setIsSuccess(false);
        if (response.status === 403) {
          setErrorMessage("Incorrect password.");
        } else {
          setErrorMessage("Failed to update user information.");
        }
        throw new Error("Failed to update user information.");
      } else if (response.ok) {
        setIsSuccess(true);
        setNotSuccess(false);
        setErrorMessage(""); // Reset error message if request is successful
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div
        className="modal"
        id="editUserModal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "flex" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Change user info for: {user.username}
              </h5>
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
              {/* adds edit user form component with function edit user to the body of the modal */}
              <EditUserForm onSubmit={updateUser} />
              {/* element shows if isSuccess = true */}
              {/* {notSuccess && (
                <p
                  style={{
                    color: "red",
                    marginTop: "1rem",
                  }}
                >
                  Failed to update user information.
                </p>
              )} */}
              {isSuccess && (
                <p
                  style={{
                    color: "green",
                    marginTop: "1rem",
                  }}
                >
                  Update successful!
                </p>
              )}
              {errorMessage && (
                <p
                  style={{
                    color: "red",
                    marginTop: "1rem",
                  }}
                >
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
