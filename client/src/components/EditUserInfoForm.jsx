import { useState, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

export default function EditUserForm({ onSubmit }) {
    const { user } = useContext(GlobalContext);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(''); // Set initial state to user's email
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault(); //prevent form default behaviour (reload)
        //checking that confirmPassword is the same as password, ensure user typed correct password
        if (newPassword !== confirmNewPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        const formData = {
            username: username,
            email: email,
            newPassword: newPassword,
            currentPassword: password,
        };

        //calling onSubmit and specifying the data passed back to the parent component
        onSubmit(formData);
        //resetting all variables on submit
        setUsername('');
        setEmail('');
        setNewPassword('');
        setConfirmNewPassword('');
        setPasswordError('');
        setPassword('');
    }

    return (
        <>
            <div className="container" id="editUserForm">
                <form onSubmit={handleSubmit} className="create-account-form">
                    <div className="form-row">
                        <label className="form-label" htmlFor="email">
                            Set new email (optional)
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control w-75"
                            id="email"
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="NewPassword">
                            Set new password (optional)
                        </label>
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            className="form-control w-75"
                            id="password"
                        />
                    </div>
                    <div className="form-row">
                        <label
                            className="form-label"
                            htmlFor="confirmNewPassword"
                        >
                            Confirm new password
                        </label>
                        <input
                            value={confirmNewPassword}
                            onChange={(e) => {
                                setConfirmNewPassword(e.target.value);
                                setPasswordError('');
                            }}
                            type="password"
                            className="form-control w-75"
                            id="confirmPassword"
                        />
                        <div className="form-row">
                            <label className="form-label" htmlFor="password">
                                Current password (required to change email
                                and/or password)
                            </label>
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type="password"
                                className="form-control w-75"
                                id="password"
                            />
                        </div>
                        {/* shows if passwordError is called */}
                        {passwordError && (
                            <p style={{ color: 'red' }}>{passwordError}</p>
                        )}
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{ marginTop: '1rem' }}
                    >
                        Update info
                    </button>
                </form>
            </div>
        </>
    );
}
