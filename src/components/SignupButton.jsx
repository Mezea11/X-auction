import { useState } from 'react';
import SignupModal from './SignupModal.jsx';
//creates button that handles the show/hide of signup modal
export default function SignupButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);//Hook to set and hold value for variable used to open/close modal

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
                onClick={openModal}//runs openModal function
                data-toggle="modal"
                data-target="#signupModal"//targets this specific modal
            >
                Sign Up
            </button>
            {/* if isModalOpen = true, adds closeModal function to SignupModal-component */}
            {isModalOpen && <SignupModal closeModal={closeModal} />}
        </>
    );
}

