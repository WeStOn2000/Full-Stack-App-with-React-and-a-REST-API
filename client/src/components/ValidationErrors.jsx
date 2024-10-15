// ValidationErrors.jsx
import PropTypes from 'prop-types';

const ValidationErrors = ({ errors }) => {
  return (
    <div className="validation--errors">
      <ul>
        {errors.map((error, i) => (
          <li key={i}>{error}</li> // Display each error in a list
        ))}
      </ul>
    </div>
  );
};

// Define prop types
ValidationErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired, // Expect an array of strings
};

export default ValidationErrors;
