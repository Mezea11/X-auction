import { useState, useEffect } from 'react';
import SignupModal from './SignupModal.jsx';

export default function SignupButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        console.log(isModalOpen)
        };

    const closeModal = () => {
        setIsModalOpen(false);
        console.log('close')
        };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                onClick={openModal}
                data-toggle="modal"
                data-target="#signupModal"
            >
                Sign Up
            </button>
            {isModalOpen && <SignupModal closeModal={closeModal} />}
        </>
    );
}

