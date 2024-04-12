import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Creates the form used for login
export default function LoginForm() {
  const [email, setEmail] = useState(""); // Hook setting the value for the email variable
  const [password, setPassword] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [loginError, setLoginError] = useState(false); // State to handle login errors
  const [users, setUsers] = useState([]); // Store the fetched users

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserById();
  }, []); // Empty dependency array to run only on component mount

  async function fetchUserById() {
    try {
      // Get user data from json-server at db.json
      const response = await fetch(`http://localhost:3000/users`);
      if (!response.ok) {
        throw new Error("Error fetching user");
      }
      const userData = await response.json();
      setUsers(userData); // Set fetched user data
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  console.log(users);

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Stop page reload

    // Check if the provided credentials match the predefined ones
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      sessionStorage.setItem("isLoggedIn", "true"); // Use sessionStorage to simulate log in
      setSuccessfulLogin(true); // Set successful login
      setLoginError(false); // Reset any previous login errors
    } else {
      setLoginError(true); // Set login error if credentials are incorrect
      setSuccessfulLogin(false);
    }

    setEmail(""); // Reset email field on submit
    setPassword(""); // Reset password field on submit
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
