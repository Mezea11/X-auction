import { useState } from 'react';
import PostProductModal from './PostProductModal.jsx';

export default function PostProductButton() {
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
                data-target="#PostProductModal"
            >
                Post Product
            </button>
            {isModalOpen && <PostProductModal closeModal={closeModal} />}
        </>
    );
}

