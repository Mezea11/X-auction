import { useState } from 'react';
import LoginModal from './LoginModal.jsx';

export default function LoginButton() {
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
                data-target="#LoginModal"
            >
                Log in
            </button>
            {isModalOpen && <LoginModal closeModal={closeModal} />}
        </>
    );
}

