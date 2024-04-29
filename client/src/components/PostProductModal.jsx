import PostProductForm from './PostProductForm.jsx';
import { useState, useEffect } from 'react';

export default function PostProductModal({ closeModal }) {
    const [isSuccess, setIsSuccess] = useState(false);

    const postProduct = async () => {
        setIsSuccess(true);
    };

    //close modal when clicking outside modal
    const handleOutsideClick = (event) => {
        if (event.target.id === 'PostProductModal') {
            // Close the modal only if the click occurs outside the modal content
            closeModal();
        }
    };
    //runs after main function renders for the first time
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        //adds event listener on click for entire document that runs handleOutsideClick

        return () => {
            document.removeEventListener('click', handleOutsideClick);
            //removes eventlistener when modal is closed and its not needed anymore
        };
    }, [closeModal]);

    return (
        <>
            <div
                className="modal"
                id="PostProductModal"
                tabIndex="-1"
                role="dialog"
                style={{ display: 'flex' }}
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Post Product</h5>
                            <button
                                style={{ marginLeft: 'auto' }}
                                type="button"
                                className="close btn btn-primary"
                                onClick={closeModal}
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <PostProductForm onSubmit={postProduct} />
                            {isSuccess && (
                                <p
                                    style={{
                                        color: 'green',
                                        marginTop: '1rem',
                                    }}
                                >
                                    Post successful!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
