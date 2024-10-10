// ValidationErrors.jsx
import PropTypes from 'prop-types'; // Import PropTypes

const ValidationErrors = ({ errors }) => {
  return (
    errors.length > 0 && (
      <div className="validation-errors">
        <h2>Validation Errors</h2>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    )
  );
};

// Define prop types for the ValidationErrors component
ValidationErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired, // Expect an array of strings
};

export default ValidationErrors;
