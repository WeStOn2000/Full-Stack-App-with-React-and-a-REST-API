// Imports the necessary hooks and React context for state management
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext"; // Importing UserContext to access authenticated user data
import { useNavigate } from "react-router-dom"; // Importing useNavigate for programmatic navigation

// CreateCourse component for handling course creation
const CreateCourse = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { authUser } = useContext(UserContext); // Access the authenticated user from UserContext

  // State to manage the course details being input by the user
  const [course, setCourse] = useState({
    userId: authUser.id, // Store the authenticated user's ID
    title: "", // Course title
    description: "", // Course description
    estimatedTime: "", // Estimated time to complete the course
    materialsNeeded: "", // Materials needed for the course
  });

  // State to hold validation or error messages from the server
  const [errors, setErrors] = useState([]);

  // Function to handle changes in the form fields
  const handleChange = (e) => {
    // Update the course state with the new value for the changed field
    setCourse({
      ...course,
      [e.target.name]: e.target.value, // Update the respective field in course state
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send a POST request to create a new course
      const response = await axios.post(
        "http://localhost:5000/api/courses", // API endpoint for creating courses
        course, // Course data to be sent
        {
          headers: {
            "Content-Type": "application/json", // Specify content type
            Authorization: `Basic ${authUser.authToken}`, // Use authUser's token for authentication
          },
        }
      );

      // If the course is created successfully (status code 201)
      if (response.status === 201) {
        const { courseId } = response.data; // Get course ID from response
        navigate(`/courses/${courseId}`); // Redirect to the new course detail page
      }
    } catch (error) {
      // Handle errors from the API
      if (error.response) {
        // Check if the error has a response from the server
        if (error.response.status === 400) {
          // If a 400 (bad request) error, extract validation errors
          setErrors(error.response.data.errors || ["Validation error occurred."]); // Set validation errors
        } else {
          // Handle other unexpected errors
          setErrors(["An unexpected error occurred."]); // Handle unexpected errors
        }
      } else {
        // Handle network issues
        setErrors(["No response from the server."]); // Handle network issues
      }
    }
  };

  // Function to handle cancel button click
  const handleCancel = (e) => {
    e.preventDefault(); // Prevent default action
    navigate("/"); // Redirect to home page
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {/* Display validation errors if any */}
        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li> // Display each error message
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="title" // Use "title" to match the state
                type="text"
                value={course.title}
                onChange={handleChange} // Handle changes in the title input
              />
              <p>
                By {authUser.firstName} {authUser.lastName} {/* Display user's name */}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="description" // Use "description" to match the state
                value={course.description}
                onChange={handleChange} // Handle changes in the description textarea
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime" // Use "estimatedTime" to match the state
                type="text"
                value={course.estimatedTime}
                onChange={handleChange} // Handle changes in the estimated time input
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded" // Use "materialsNeeded" to match the state
                value={course.materialsNeeded}
                onChange={handleChange} // Handle changes in the materials needed textarea
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course {/* Button to submit the form */}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel {/* Button to cancel course creation and navigate home */}
          </button>
        </form>
      </div>
    </main>
  );
};

// Exports the CreateCourse component
export default CreateCourse;
