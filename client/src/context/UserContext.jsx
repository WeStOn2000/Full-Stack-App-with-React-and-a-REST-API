import  { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserContext = createContext();

// Create provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signInUser = async (credentials) => {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

    const options = {
      url: "http://localhost:5000/api/users",
      method: "GET",
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
      }
    }
    const response = await axios(options);
    
      if(response.status === 200) {
       
        const user = response.data;
        user.authToken = encodedCredentials;  
        setUser(user);
       
        return user;
      } else {
        return null;
      }
    
  };

  const signOutUser = () => {
      // Sign Out User Function
      setUser(null);
  };

  return (
    <UserContext.Provider value={{
      user, 
      actions: {
        signInUser,
        signOutUser
      }
    }}>
      {children}
    </UserContext.Provider>
  );
}

//  propTypes validation for children
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };