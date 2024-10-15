import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import ValidationErrors from "./ValidationErrors"; // Component to display validation errors

const SignUp = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { actions } = useContext(UserContext); // Access user context actions

  // State to store user input
  const [firstName, setFirstName] = useState(""); // State for first name input
  const [lastName, setLastName] = useState(""); // State for last name input
  const [emailAddress, setEmailAddress] = useState(""); // State for email address input
  const [password, setPassword] = useState(""); // State for password input

  // State to track form submission and validation errors
  const [isSubmitted, setIsSubmitted] = useState(false); // Flag to check if the form has been submitted
  const [errors, setErrors] = useState([]); // Array to hold validation error messages

  /**
   * Validates the form fields before submission.
   * @returns {string[]} Array of error messages if validation fails.
   */
  const validateForm = () => {
    const newErrors = []; // Initialize an array to hold error messages

    // Validate each field and push error messages if any field is invalid
    if (!firstName.trim()) newErrors.push("Please provide a value for 'First Name'");
    if (!lastName.trim()) newErrors.push("Please provide a value for 'Last Name'");
    if (!emailAddress.trim() || !/\S+@\S+\.\S+/.test(emailAddress)) 
      newErrors.push("Please provide a valid email address");
    if (!password.trim()) 
      newErrors.push("Please provide a value for 'Password'");
    // Optional: Add a maximum length check to prevent excessively long passwords
    if (password.length > 255)
      newErrors.push("Password cannot exceed 255 characters");

    return newErrors; // Return the array of error messages
  };

  /**
   * Handles form submission for user sign-up.
   * @param {Event} e - The submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitted(true); // Set the submitted flag to true

    const validationErrors = validateForm(); // Validate the form fields
    if (validationErrors.length > 0) {
      setErrors(validationErrors); // Set errors state if there are validation errors
      return; // Stop submission if there are errors
    }

    const user = { // Create user object from state
      firstName,
      lastName,
      emailAddress,
      password,
    };

    try {
      // Send a POST request to create a new user
      const response = await axios.post("http://localhost:5000/api/users", user);

      if (response.status === 201) { // Check if the response status is successful
        console.log(`${user.emailAddress} has successfully signed up.`);
        setErrors([]); // Clear any existing errors upon successful sign-up

        // Attempt to sign in the newly created user
        const authUser = await actions.signInUser(emailAddress, password);
        if (authUser) {
          navigate("/"); // Redirect to the homepage on successful login
        } else {
          setErrors(["Sign-in failed after registration. Please try signing in manually."]); // Handle sign-in failure
        }
      }
    } catch (error) {
      if (error.response) { // Handle server-side errors
        if (error.response.status === 400) {
          setErrors(error.response.data.errors || ["Validation error occurred."]); // Set server validation errors
        } else {
          setErrors(["An unexpected error occurred."]); // Handle other unexpected errors
        }
      } else if (error.request) {
        setErrors(["No response from the server. Please try again later."]); // Handle network issues
      } else {
        setErrors([error.message]); // Handle unexpected errors with a message
      }
    }
  };

  /**
   * Handles cancellation of the sign-up process by navigating back to the home page.
   */
  const handleCancel = (e) => {
    e.preventDefault(); // Prevent default action on button click
    navigate("/"); // Navigate back to the homepage
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>

        {/* Display validation errors only after form submission */}
        <div className="validation--errors">
            <h3>Validation Errors</h3>
        {isSubmitted && errors.length > 0 && <ValidationErrors errors={errors} />}
        </div>

        {/* Form to capture user details for signing up */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} // Update first name state on input change
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} // Update last name state on input change
          />

          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)} // Update email address state on input change
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          />

          {/* Submit button */}
          <button className="button" type="submit">
            Sign Up
          </button>
          
          {/* Cancel button */}
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>

        {/* Link to sign in page */}
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default SignUp;