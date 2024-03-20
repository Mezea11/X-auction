import React, { useState } from 'react';
import SignupModal from './SignupModal';

export default function SignupButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
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
                data-target="#signupModal"
            >
                Sign Up
            </button>
            {isModalOpen && <SignupModal closeModal={closeModal} />}
        </>
    );
}

