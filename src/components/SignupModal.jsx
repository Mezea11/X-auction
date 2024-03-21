import SignupForm from './SignupForm.jsx';
import { useState } from 'react';


export default function SignupModal({ closeModal }) {

    return (
        <>
            <div className="modal" id="signupModal" tabIndex="-1" role="dialog" 
            style={{ display: 'flex', position: 'initial'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sign Up</h5>
                            <button type="button" className="close btn btn-primary" onClick={closeModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <SignupForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
