//import { right } from "@popperjs/core/index.js";
import { useEffect, useState } from "react";
import PlaceBidFunction from "./PlaceBidFunction.jsx";
//Creates the modal component for the login form
export default function PlaceBidModal({ closeModal }) {
  //closeModal function is passed as prop

  const [bidSubmitted, setBidSubmitted] = useState(false);

  const handleBidSubmit = (bidData) => {
    console.log("Bid submitted", bidData);
    setBidSubmitted(true);
    //close modal on successful bid after time delay
    setTimeout(() => {
      closeModal();
    }, 1500);
    
  };
  //close modal when clicking outside modal
  const handleOutsideClick = (event) => {
    if (event.target.id === "PlaceBidModal") {
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
  }, [closeModal]);//listening to changes in close
  

  return (
    <>
      <div
        className="modal"
        id="PlaceBidModal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "flex" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Place Bid</h5>
              {/* closeModal function called when clicking button */}
              <button
                type="button"
                style={{ marginLeft: "auto" }}
                className="close btn btn-primary"
                onClick={closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <PlaceBidFunction onSubmit={handleBidSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
