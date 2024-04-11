//import { right } from "@popperjs/core/index.js";
import { useState } from "react";
import PlaceBidFunction from "./PlaceBidFunction.jsx";
//Creates the modal component for the login form
export default function PlaceBidModal({ closeModal }) {
  //closeModal function is passed as prop

  const [bidSubmitted, setBidSubmitted] = useState(false);

  const handleBidSubmit = (bidData) => {
    console.log("Bid submitted", bidData);
    setBidSubmitted(true);
  };

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
