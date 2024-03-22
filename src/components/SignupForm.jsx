import { useState } from "react"

export default function SignupForm() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function handleSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        const formData = {
            id: crypto.randomUUID(),
            username: username,
            email: email,
            password: password
        };

        console.log(formData);

        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
    }
    //i put the form in a container for now, thinking more css/modal is easier to deal with after
    //implementing sign up button which will have linked functionality
    return (
        <>
            <div className="container" id="signupForm">
                <form onSubmit={handleSubmit} className="create-account-form">
                    <div className="form-row">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            className="form-control w-75"
                            id="username"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            className="form-control w-75"
                            id="email"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            className="form-control w-75"
                            id="password"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            value={confirmPassword}
                            onChange={e => {
                                setConfirmPassword(e.target.value);
                                setPasswordError("");
                            }}
                            type="password"
                            className="form-control w-75"
                            id="confirmPassword"
                            required
                        />
                        {passwordError && <p className="passwordError">{passwordError}</p>}
                    </div>
                    <button className="btn btn-primary">Create Account</button>
                </form>
            </div>
        </>
    )
}
