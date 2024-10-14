/**
 * UserSignUp component that handles creating new users and managing form submissions.
 */

// Import necessary hooks and libraries
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Used for making HTTP requests
import { UserContext } from "../context/UserContext"; // Context to handle user-related actions
import ValidationErrors from "./ValidationErrors";

const SignUp = () => {
  // Use navigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Destructure actions from the UserContext
  const { actions } = useContext(UserContext);

  // State to store validation errors and user input
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handles form submission for user sign-up
   * @param {Event} e - The submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Collect user input from form fields
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    try {
      // Send a POST request to the server to create a new user
      const response = await axios.post("http://localhost:5000/api/users", user);

      // Check if the response status indicates successful creation
      if (response.status === 201) {
        console.log(`${user.emailAddress} has successfully signed up.`);
        setErrors([]); // Clear any existing errors

        // Optionally attempt to sign in
        const authUser = await actions.signInUser(user.emailAddress, user.password);
        if (authUser) {
          navigate("/");
        }else {
          setErrors(["Sign-in failed after registration. Please try signing in manually."]);
        }
      }
    } catch (error) {
      // Handle any errors that occur during the sign-up process
      if (error.response) {
        console.error("Server Error: ", error.response.data);
        const serverErrors = error.response.data.errors || ["An unexpected error occurred."];
        setErrors(serverErrors.map(err => err.message || err)); // Adjust based on the structure
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
    e.preventDefault(); // Prevent default link behavior
    navigate("/"); // Navigate to the home page
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>

        {/* Display validation errors, if any */}
        {errors.length > 0 && <ValidationErrors errors={errors} />}

        {/* Form to capture user details for signing up */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input 
            id="firstName" 
            name="firstName" 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} // Use state management for inputs
            required 
          />

          <label htmlFor="lastName">Last Name</label>
          <input 
            id="lastName" 
            name="lastName" 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} // Use state management for inputs
            required 
          />

          <label htmlFor="emailAddress">Email Address</label>
          <input 
            id="emailAddress" 
            name="emailAddress" 
            type="email" 
            value={emailAddress} 
            onChange={(e) => setEmailAddress(e.target.value)} // Use state management for inputs
            required 
          />

          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Use state management for inputs
            required 
          />

          {/* Submit button to sign up */}
          <button className="button" type="submit">Sign Up</button>

          {/* Cancel button to discard form and go back to home page */}
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>

        {/* Link to sign-in page if the user already has an account */}
        <p>
          Already have a user account? Click here to <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

// Export the SignUp component
export default SignUp;
