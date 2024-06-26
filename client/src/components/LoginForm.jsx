import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext.jsx';

export default function LoginForm() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(GlobalContext);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [username, setUsername] = useState('');

    async function postLogin(e) {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const result = await response.json();

            if (response.status === 200) {
                setUser(result);
                navigate('/mypage');
            } else {
                if (response.status === 404 || response.status === 409) {
                    setLoginError(true);
                }
                // Handle other status codes or errors
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle network or parsing errors
        }
    }

    function handleSubmit(e) {
        postLogin(e);
    }

    return (
        <>
            <div className="container" id="LoginForm">
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-row">
                        <label className="form-label" htmlFor="username">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            type="text"
                            className="form-control w-75"
                            id="username"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            type="password"
                            className="form-control w-75"
                            id="password"
                            required
                        />
                    </div>
                    {loginError && ( // Render login error message if there's a login error
                        <div
                            className="alert alert-danger"
                            role="alert"
                            id="alert-message"
                        >
                            Incorrect username or password. Please try again.
                        </div>
                    )}
                    <button
                        style={{ marginTop: '1rem' }}
                        className="btn btn-primary"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </>
    );
}
