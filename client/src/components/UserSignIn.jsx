/**
 *this is the form that allows a user who already has an account to sign in and gets back to his home page
 */
//imports
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SignIn = () => {
  // State variables to store email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        setError("Sign in was unsuccessful");
      }
    } catch (error) {
      console.error("Sign in error:", error); 
      if (error.response && error.response.status === 401) {
        setError("Unauthorized: Incorrect email or password");
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
        {error && <p style={{ color: "red" }}>{error}</p>}
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
//exports the component
export default SignIn;
