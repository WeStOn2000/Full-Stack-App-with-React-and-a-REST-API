import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
  
  const { authUser, signOut } = useContext(UserContext);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedin">
            {authUser ? (
              // Render user's name and Sign Out button if authenticated
              <>
                <li>Welcome, {authUser.name}!</li>
                <li>
                  <button onClick={signOut}>Sign Out</button>
                </li>
              </>
            ) : (
              // Render Sign In and Sign Up links if not authenticated
              <>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
