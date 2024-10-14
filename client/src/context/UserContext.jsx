import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create the UserContext to be used for sharing user authentication state across components
export const UserContext = createContext();

// Create provider component to wrap the app and provide user context
export const UserProvider = ({ children }) => {
  // State to hold the authenticated user information
  const [authUser, setAuthUser] = useState(null);

  /**
   * Function to sign in the user
   * @param {string} username - The user's email address
   * @param {string} password - The user's password
   * @returns {Object|null} The authenticated user object or null if authentication fails
   */
  const signInUser = async (username, password) => {
    try {
      // Encode the username and password for Basic Auth
      const encodedCredentials = btoa(`${username}:${password}`);
      
      // Set the request options for the API call
      const options = {
        url: "http://localhost:5000/api/users",
        method: "GET",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      };
      
      // Log the Authorization header for debugging purposes
      console.log("Authorization Header:", options.headers.Authorization);
      
      // Make the API request to get user data
      const response = await axios(options);
      
      // If the request is successful (status 200), set the user and return it
      if (response.status === 200) {
        const user = response.data;
        // Add the auth token to the user object
        user.authToken = encodedCredentials;
        // Update the authUser state
        setAuthUser(user);
        
        // Set default authorization header for all future axios requests
        axios.defaults.headers.common['Authorization'] = `Basic ${encodedCredentials}`;
        
        return user;
      }
    } catch (error) {
      // Log any errors that occur during sign in
      console.error("Sign in failed", error);
      return null;
    }
  };

  /**
   * Function to sign out the user
   * Clears the authUser state and removes the authorization header
   */
  const signOutUser = () => {
    // Clear the authUser state
    setAuthUser(null);
    // Remove the authorization header from future requests
    delete axios.defaults.headers.common['Authorization'];
  };

  // Provide the authUser and actions to the rest of the application via context
  return (
    <UserContext.Provider
      value={{
        authUser,
        actions: {
          signInUser,
          signOutUser,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// PropTypes validation for children
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};