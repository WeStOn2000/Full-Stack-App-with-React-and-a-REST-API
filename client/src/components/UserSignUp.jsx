 /**
   * UsersignUp component that handles creating new users and handle form submissions
   */
  //Importing  hooks
import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);

  // State for form references and errors
  const firstname = useRef(null);
  const lastname = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data
    const user = {
      firstName: firstname.current.value,
      lastName: lastname.current.value,
      emailAddress: username.current.value,
      password: password.current.value,
    };

    const options = {
      url: "http://localhost:5000/api/users",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: JSON.stringify(user),
    };

    try {
      const response = await axios(options);

      if (response.status === 201) {
        console.log(`${user.emailAddress} is successfully signed up.`);
        // Automatically sign the user in after successful registration
        const authUser = await actions.signInUser({
          username: user.emailAddress,
          password: user.password,
        });
        if (authUser) {
          navigate("/");
        } else {
          setErrors(["Sign in was unsuccessful"]);
        }
      }
    } catch (error) {
      console.log("Caught Errors: ", error);
      if (error.response) {
        console.log("Server Error: ", error.response.data);
        setErrors(error.response.data.errors || ["An unexpected error occurred"]);
      } else if (error.request) {
        console.log("No response received: ", error.request);
        setErrors(["No response from the server. Please try again later."]);
        navigate("/error");
      } else {
        console.log("Error setting up request: ", error.message);
        setErrors([error.message]);
        navigate("/error");
      }
    }
  };

  // Handles the cancel button action
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>

        {/* Display validation errors */}
        {errors.length > 0 && (
          <div>
            <h2 className="validation--errors--label">Validation Errors</h2>
            <div className="validation-errors">
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" ref={firstname} required />

          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" ref={lastname} required />

          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" ref={username} required />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" ref={password} required />

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
//exports component
export default SignUp;
