/**
 *this header component displays the initial layout of the web application and gives users to course details and access to submission forms
 */
//imports the reactcontext component
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext); // Getting data from userContext

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          <ul className={user ? "header--signedin" : "header--signedout"}>
            {user ? (
              <>
                <li>Welcome, {user.firstName}</li>
                <li>
                  <Link to="/signout">Sign Out</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
//exports the component
export default Header;
