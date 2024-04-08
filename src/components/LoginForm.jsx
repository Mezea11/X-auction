import { useState } from "react";
//Creates the form used for login
export default function LoginForm() {
  const [email, setEmail] = useState(""); //Hook setting the value for the email variable
  const [password, setPassword] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  //triggers when submitting the form
  function handleSubmit(e) {
    e.preventDefault(); //stop page reload

    const formData = {
      email: email,
      password: password,
    };

    console.log(formData);

    sessionStorage.setItem("isLoggedIn", "true"); //use sessionStorage to simulate log in

    setEmail(""); //reset variable on submit
    setPassword("");
    setSuccessfulLogin(true); //show successful message after submission
  }

  return (
    <>
      <div className="container" id="LoginForm">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-row">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control w-75"
              id="email"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control w-75"
              id="password"
              required
            />
          </div>
          <button style={{ marginTop: "1rem" }} className="btn btn-primary">
            Log in
          </button>
          <div className="modal-body">
            {successfulLogin ? (
              <div className="alert alert-success" role="alert">
                You have logged in successfully. You may now close the window.
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
}
