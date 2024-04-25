import { useState } from 'react';
import PatchProductModal from './PatchProductModal.jsx';

export default function PatchProductButton() {
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
                className="btn btn-success"
                onClick={openModal}
                data-toggle="modal"
                data-target="#PatchProductModal"
            >
                Update Product
            </button>
            {isModalOpen && <PatchProductModal closeModal={closeModal} />}
        </>
    );
}