import { useState } from 'react';
import PostProductModal from './PostProductModal.jsx';

export default function PostProductButton() {
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
                data-target="#PostProductModal"
            >
                Post Product
            </button>
            {isModalOpen && <PostProductModal closeModal={closeModal} />}
        </>
    );
}
