import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import ValidationErrors from "./ValidationErrors"; // Component to display errors

const SignUp = () => {
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);

  // State to store validation errors and user input
  const [errors, setErrors] = useState([]); // To handle server-side validation errors
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

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

    try {
      // Send a POST request to create a new user
      const response = await axios.post("http://localhost:5000/api/users", user);

      if (response.status === 201) {
        console.log(`${user.emailAddress} has successfully signed up.`);
        setErrors([]); // Clear errors upon successful sign-up

        // Attempt to sign in the newly created user
        const authUser = await actions.signInUser(emailAddress, password);
        if (authUser) {
          navigate("/"); // Redirect to the homepage on successful login
        } else {
          setErrors([
            "Sign-in failed after registration. Please try signing in manually.",
          ]);
        }
      }
    } catch (error) {
      if (error.response) {
        // If server returns validation errors (400)
        if (error.response.status === 400) {
          const serverErrors = error.response.data.errors || [
            "Validation error occurred.",
          ];
          setErrors(serverErrors); // Display validation errors from the server
        } else {
          setErrors(["An unexpected error occurred."]); // Handle other errors
        }
      } else if (error.request) {
        setErrors(["No response from the server. Please try again later."]);
      } else {
        setErrors([error.message]); // Handle unexpected errors
      }
    }
  };

  /**
   * Handles cancellation of the sign-up process by navigating back to the home page.
   */
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/"); // Navigate back to the homepage
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
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>

        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default SignUp;
