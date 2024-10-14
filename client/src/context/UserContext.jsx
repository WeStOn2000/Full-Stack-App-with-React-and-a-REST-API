import { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// Create the UserContext
export const UserContext = createContext();

// Create provider component
export const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  // Function to sign in the user
  const signInUser = async (credentials) => {
    const encodedCredentials = btoa(
      `${credentials.username}:${credentials.password}`
    );
    // Set the request options for the API call
    const options = {
      url: "http://localhost:5000/api/users",
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    };
    console.log("Authorization Header:", options.headers.Authorization); // Debugging line
    
    // Make the API request to get user data
    const response = await axios(options);
    // If the request is successful (status 200), set the user and return it
    if (response.status === 200) {
      const user = response.data;
      user.authToken = encodedCredentials;
      setAuthUser(user);
      return user;
    } else {
  return null;
    }
  };
  // Function to sign out the user
  const signOutUser = () => {
    // Sign Out User Function
    setAuthUser(null);
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

//  propTypes validation for children
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};