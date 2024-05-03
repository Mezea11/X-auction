import { useState } from 'react';
import EditUserModal from './EditUserInfoModal.jsx';

//creates button that handles the show/hide of editUsermodal
export default function EditUserButton() {
    const [isModalOpen, setIsModalOpen] = useState(false); //Hook to set and hold value for variable used to open/close modal

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
                className="btn btn-secondary"
                onClick={openModal} //runs openModal function
                data-toggle="modal"
                data-target="#editUserModal" //targets this specific modal
            >
                Change user info
            </button>
            {/* if isModalOpen = true, adds closeModal function to editUserModal-component */}
            {isModalOpen && <EditUserModal closeModal={closeModal} />}
        </>
    );
}
