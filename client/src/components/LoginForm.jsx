import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext.jsx";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState("");

  async function postLogin() {
    try {
      const response = await fetch("/api/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });
      console.log("step 1: entering function");

      const result = await response.json();

      if (response.ok) {
        setUser(result);
        navigate("./mypage");
        console.log("step 2: successful login");
      } else {
        if (response.status === 404 || response.status === 409) {
          setLoginError(true);
          console.log("step 3: 404");
        }
        // Handle other status codes or errors
      }
    } catch (error) {
      console.error("Error during login:", error);
      console.log("error");
      // Handle network or parsing errors
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    postLogin();
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
          {loginError && ( // Render login error message if there's a login error
            <div className="alert alert-danger" role="alert">
              Incorrect email or password. Please try again.
            </div>
          )}
          <button style={{ marginTop: "1rem" }} className="btn btn-primary">
            Log in
          </button>
          <div className="modal-body">
            {successfulLogin && ( // Render success message if login was successful
              <div className="alert alert-success" role="alert">
                You have logged in successfully.
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
