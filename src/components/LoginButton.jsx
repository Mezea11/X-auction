import { useState } from "react";
import LoginModal from "./LoginModal.jsx";

export default function LoginButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={openModal}>
        Log in
      </button>
      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </>
  );
}
