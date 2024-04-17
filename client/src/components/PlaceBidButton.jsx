import { useState } from "react";
import PlaceBidModal from "./PlaceBidModal.jsx";
//Function for button component that triggers the modal for login to open or close
export default function PlaceBidButton() {
  const [isModalOpen, setIsModalOpen] = useState(false); //Variable that holds the current value using the useState Hook

  const openModal = () => {
    setIsModalOpen(true); //Sets the value for variable isModalOpen
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={openModal}
        data-toggle="modal"
        data-target="#PlaceBidModal"
      >
        Place Bid
      </button>
      {isModalOpen && <PlaceBidModal closeModal={closeModal} />}
    </>
  );
}
