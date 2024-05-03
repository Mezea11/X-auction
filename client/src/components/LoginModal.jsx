import { useEffect } from 'react';
import LoginForm from './LoginForm.jsx';
//Creates the modal component for the login form
export default function LoginModal({ closeModal }) {
    //closeModal function is passed as prop

    //close modal when clicking outside modal
    const handleOutsideClick = (event) => {
        if (event.target.id === 'LoginModal') {
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
                id="LoginModal"
                tabIndex="-1"
                role="dialog"
                style={{ display: 'flex' }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Log in</h5>
                            {/* closeModal function called when clicking button */}
                            <button
                                type="button"
                                style={{ marginLeft: 'auto' }}
                                className="close btn btn-primary"
                                onClick={closeModal}
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
