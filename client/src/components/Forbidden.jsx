import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirects to the home page
  };

  return (
    <main>
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>Oh oh! You cannot access this page.</p>
        {/* Button to go back to the home page */}
        <button className="button" onClick={handleGoHome}>
          Return Home 
        </button>
      </div>
    </main>
  );
};

// Exports the component
export default Forbidden;
