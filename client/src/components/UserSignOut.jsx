 /**
   *Signout component that handles users signout requests 
   */
//Importing react hooks
import { useContext, useEffect } from "react";
import {UserContext} from "../context/UserContext";
import { Navigate } from "react-router-dom";

const UserSignOut = () => {
  const { actions } = useContext(UserContext);
  
  useEffect(() => actions.signOutUser());
  return <Navigate to="/" replace />
}
//exports the component
export default UserSignOut;