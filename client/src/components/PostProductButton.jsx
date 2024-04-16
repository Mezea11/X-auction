import { useState } from 'react';
import PostProductModal from './PostProductModal.jsx';
import PostProductForm from './PostProductForm.jsx';

export default function PostProductButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        console.log(isModalOpen)
        };

    const closeModal = () => {
        setIsModalOpen(false);
        console.log('close')
        setSuccessfulpost(false)
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

