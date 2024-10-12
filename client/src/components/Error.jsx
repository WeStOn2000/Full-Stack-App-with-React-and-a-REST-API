import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirects to the home page
  };

  return (
    <main>
      <div className="wrap">
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
        {/* Button to go back to the home page */}
        <button className="button" onClick={handleGoHome}>
          Return Home
        </button>
      </div>
    </main>
  );
};

// Exports the component
export default Error;
