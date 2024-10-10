import  { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
// moved axios import to UserContext
import { UserContext } from "../context/UserContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  // Event Handlers
  const handleSignIn = async (e) => {
    e.preventDefault();

    const credentials = {
      username: email,
      password: password,
    };
    // Moved encoded credentials  and axios options to UserContext
    
    try {
      const user = await actions.signInUser(credentials);

      if (user) {
        navigate("/");
      } else {
        setError('Sign in was unsuccessful');
      }
    } catch (error) {
      //console.log(error.response.status);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized: Incorrect email or password');
        //console.log(error);
      } else {
      console.log("Error: ", error);
      navigate("/error");
    }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {error && <p style={{color:'red'}}>{error}</p>}
        <form onSubmit={handleSignIn}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></input>
          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          if you do not have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default SignIn;