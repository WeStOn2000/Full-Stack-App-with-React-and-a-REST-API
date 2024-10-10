// PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);
  return authUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
