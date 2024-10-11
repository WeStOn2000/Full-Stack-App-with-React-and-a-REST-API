/**
 *validation error component that is used in other components when someone doesnot provide the correct validations
 */
//importing props validator
import PropTypes from "prop-types";

const ValidationErrors = ({ errors }) => {
  if (!errors || errors.length === 0) return null;
  return (
    errors.length > 0 && (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error.message || error}</li>
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
// exports component
export default ValidationErrors;
