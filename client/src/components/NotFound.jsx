import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const NotFound = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle button click
  const handleGoHome = () => {
    navigate('/'); // Navigate to the home route
  };

  return (
    <main>
      <div className="wrap">
        <h2>Not Found</h2> {/* Heading */}
        <p>
          Sorry! We can not find the page you are looking for.
        </p>
        <button onClick={handleGoHome}>Return  Home</button> {/* Button */}
      </div>
    </main>
  );
};

// Export the component
export default NotFound;
