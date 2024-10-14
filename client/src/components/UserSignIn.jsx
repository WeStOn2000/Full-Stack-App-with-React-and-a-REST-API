/**
 * This component allows a user who already has an account to sign in and return to the home page.
 */
// Imports
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SignIn = () => {
  // State variables to store email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]); // Array to store validation errors

  // Access the actions from UserContext, particularly the signInUser method
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  // Event handler for signing in the user
  const handleSignIn = async (e) => {
    e.preventDefault();

    const credentials = {
      username: email,
      password: password,
    };

    try {
      // Call the signInUser method with the user's credentials
      const user = await actions.signInUser(credentials);
      if (user) {
        console.log('Signed in user:', user);
        navigate("/");
      } else {
        setErrors(["Sign in was unsuccessful. Please check your credentials."]);
      }
    } catch (error) {
      console.error("Sign in error:", error); 
      if (error.response && error.response.status === 401) {
        setErrors(["Unauthorized: Incorrect email or password."]);
      } else {
        console.log("Error: ", error);
        navigate("/error");
      }
    }
  };

  // Handle the cancel button, which redirects to the home page
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        {/* Display validation errors if any */}
        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSignIn}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Do not have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

// Exports the component
export default SignIn;
