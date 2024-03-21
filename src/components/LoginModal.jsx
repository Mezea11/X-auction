import LoginForm from "./LoginForm.jsx";

export default function LoginModal({closeModal}) {

    return (
        <>
            <div className="modal" id="LoginModal" tabIndex="-1" role="dialog" 
            style={{ display: 'flex'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Log in</h5>
                            <button type="button" className="close btn btn-primary" onClick={closeModal} aria-label="Close">
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