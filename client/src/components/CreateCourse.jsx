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
    setCourse({
      ...course,
      [e.target.name]: e.target.value, // Update the respective field in course state
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
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
      if (response.status === 201) {
        const { courseId } = response.data; // Get course ID from response
        navigate(`/courses/${courseId}`); // Redirect to the new course detail page
      }
    } catch (error) {
      // Handle errors from the API
      if (error.response) {
        if (error.response.status === 400 && error.response.data.message.errors) {
          setErrors(error.response.data.message.errors); // Set validation errors
        } else {
          setErrors(["An unexpected error occurred."]); // Handle unexpected errors
          navigate("/error"); // Redirect to error page
        }
      } else {
        setErrors(["No response from the server."]); // Handle network issues
        navigate("/error"); // Redirect to error page
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
        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error.message}</li>
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
                onChange={handleChange}
              />
              <p>
                By {authUser.firstName} {authUser.lastName} {/* Display user's name */}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="description" // Use "description" to match the state
                value={course.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime" // Use "estimatedTime" to match the state
                type="text"
                value={course.estimatedTime}
                onChange={handleChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded" // Use "materialsNeeded" to match the state
                value={course.materialsNeeded}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

// Exports the CreateCourse component
export default CreateCourse;
