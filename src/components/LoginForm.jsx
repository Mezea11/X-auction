import { useState } from "react"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        const formData = {
            email: email,
            password: password
        };

        console.log(formData);

        sessionStorage.setItem("isLoggedIn", "true");
        
        setEmail("");
        setPassword("");

    }
    //i put the form in a container for now, thinking more css/modal is easier to deal with after
    //implementing log in button which will have linked functionality
    return (
        <>
            <div className="container" id="LoginForm">
                <form onSubmit={handleSubmit} className="login-form">
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
                    <button className="btn btn-primary">Log in</button>
                </form>
            </div>
        </>
    )
}
