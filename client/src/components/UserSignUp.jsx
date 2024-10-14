/**
 * UserSignUp component that handles creating new users and managing form submissions.
 */

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import ValidationErrors from "./ValidationErrors";

const SignUp = () => {
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);

  // State to store validation errors and user input
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Checks if an email already exists in the system
   * @param {string} email - The email to check
   * @returns {Promise<boolean>} Whether the email exists
   */


  /**
   * Handles form submission for user sign-up
   * @param {Event} e - The submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };


      try{
      // Send a POST request to create a new user
      const response = await axios.post("http://localhost:5000/api/users", user);

      if (response.status === 201) {
        console.log(`${user.emailAddress} has successfully signed up.`);
        setErrors([]);

        // Attempt to sign in the newly created user
        const authUser = await actions.signInUser(emailAddress, password);
        if (authUser) {
          navigate("/");
        } else {
          setErrors(["Sign-in failed after registration. Please try signing in manually."]);
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error: ", error.response.data);
        if (error.response.status === 400 && error.response.data.message === "The email address you entered already exists") {
          setErrors(["The email address you entered is already registered. Please use a different email or try signing in."]);
        } else {
          // Handle other types of server errors
          const serverErrors = error.response.data.errors || [error.response.data.message || "An unexpected error occurred."];
          setErrors(Array.isArray(serverErrors) ? serverErrors : [serverErrors]);
        }
      } else if (error.request) {
        console.error("No response received: ", error.request);
        setErrors(["No response from the server. Please try again later."]);
      } else {
        console.error("Error setting up request: ", error.message);
        setErrors([error.message]);
      }
    }
  };

  /**
   * Handles cancellation of the sign-up process by navigating back to the home page.
   */
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>

        {/* Display validation errors if there are any */}
        {errors.length > 0 && <ValidationErrors errors={errors} />}

        {/* Form to capture user details for signing up */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input 
            id="firstName" 
            name="firstName" 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            required 
          />

          <label htmlFor="lastName">Last Name</label>
          <input 
            id="lastName" 
            name="lastName" 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            required 
          />

          <label htmlFor="emailAddress">Email Address</label>
          <input 
            id="emailAddress" 
            name="emailAddress" 
            type="email" 
            value={emailAddress} 
            onChange={(e) => setEmailAddress(e.target.value)}
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

          <button className="button" type="submit">Sign Up</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>

        <p>
          Already have a user account? Click here to <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default SignUp;