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

  // State to hold validation errors
  const [errors, setErrors] = useState({
    title: false, // Flag for title field error
    description: false, // Flag for description field error
    other: [], // Array to hold other error messages
  });

  // Function to handle changes in the form fields
  const handleChange = (e) => {
    // Update the course state with the new value for the changed field
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
    // Clear the error for this field when the user starts typing
    if (e.target.name === 'title' || e.target.name === 'description') {
      setErrors(prev => ({ ...prev, [e.target.name]: false }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate title and description
    const newErrors = {
      title: !course.title.trim(), // Check if title is empty
      description: !course.description.trim(), // Check if description is empty
      other: [],
    };

    // If there are validation errors, update the errors state and stop submission
    if (newErrors.title || newErrors.description) {
      setErrors(newErrors);
      return;
    }

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
        if (error.response.status === 400) {
          // If a 400 (bad request) error, extract validation errors
          setErrors(prev => ({ ...prev, other: error.response.data.errors || ["Validation error occurred."] }));
        } else {
          // Handle other unexpected errors
          setErrors(prev => ({ ...prev, other: ["An unexpected error occurred."] }));
        }
      } else {
        // Handle network issues
        setErrors(prev => ({ ...prev, other: ["No response from the server."] }));
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
        {(errors.title || errors.description || errors.other.length > 0) && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.title && <li>Please provide a value for Title</li>}
              {errors.description && <li>Please provide a value for Description</li>}
              {errors.other.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Course creation form */}
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              {/* Course Title input */}
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="title"
                type="text"
                value={course.title}
                onChange={handleChange}
              />
              {/* Display course creator's name */}
              <p>
                By {authUser.firstName} {authUser.lastName}
              </p>

              {/* Course Description textarea */}
              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="description"
                value={course.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              {/* Estimated Time input */}
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={course.estimatedTime}
                onChange={handleChange}
              />

              {/* Materials Needed textarea */}
              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={course.materialsNeeded}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          {/* Submit button */}
          <button className="button" type="submit">
            Create Course
          </button>
          {/* Cancel button */}
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