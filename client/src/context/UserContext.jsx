import{ createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('/api/users/login', { email, password });
      setAuthUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Sign-in failed', error);
      return null;
    }
  };

  const signOut = () => {
    setAuthUser(null);
  };

  return (
    <UserContext.Provider value={{ authUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

//  propTypes validation for children
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default UserContext;
