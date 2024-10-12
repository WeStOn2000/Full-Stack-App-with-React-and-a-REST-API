// Import necessary hooks and components from React and React Router
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);
  // If the user is authenticated, render the Outlet component (which represents the child routes)
  // Otherwise, redirect to the sign-in page using Navigate
  return authUser ? <Outlet /> : <Navigate to="/signin" replace />;
};
//exports the component
export default PrivateRoute;
