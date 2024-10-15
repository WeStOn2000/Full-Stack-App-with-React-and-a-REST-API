// Import necessary hooks and components
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import ValidationErrors from "./ValidationErrors"; // Assuming you have this component

const UpdateCourse = () => {
  // State to manage the course details
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  });

  // State to track form submission and validation errors
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  // Get the course id from the URL parameters and authenticated user info from context
  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch course details on component mount
  // Fetch course details on component mount
useEffect(() => {
  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/courses/${id}`
      );
      const courseData = response.data;

      if (courseData.userId !== authUser?.id) {
        setCourse(courseData);
      } else {
        navigate("/forbidden"); // Redirect if not the course owner
      }
    } catch (error) {
      console.error("Error fetching course details", error);
      navigate("/notfound"); // Redirect on error
    }
  };

  if (authUser) {
    fetchCourse();
  }
}, [id, authUser, navigate]);

  // Update the course state with the form input changes
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  /**
   * Validates the form fields before submission.
   * @returns {string[]} Array of error messages if validation fails.
   */
  const validateForm = () => {
    const newErrors = [];

    if (!course.title.trim()) newErrors.push("Please provide a value for 'Title'");
    if (!course.description.trim()) newErrors.push("Please provide a value for 'Description'");
    // Add any other field validations as needed

    return newErrors;
  };

  // Handle form submission to update the course details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Send a PUT request to update the course
      const response = await axios.put(
        `http://localhost:5000/api/courses/${id}`,
        {
          userId: authUser.id,
          title: course.title,
          description: course.description,
          estimatedTime: course.estimatedTime,
          materialsNeeded: course.materialsNeeded,
        },
        {
          headers: {
            Authorization: `Basic ${authUser.authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // If update is successful, navigate to the updated course detail page
      if (response.status === 204) {
        navigate(`/courses/${id}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle validation errors from the server
        setErrors(error.response.data.errors || ["Validation error occurred."]);
      } else {
        // Handle unexpected errors
        setErrors(["An unexpected error occurred."]);
        navigate("/error"); // Redirect to error page on server error
      }
    }
  };

  // Handle cancel button click
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`); // Navigate back to the course detail page
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {/* Display validation errors only after form submission */}
      <div className="validation--errors">
            <h3>Validation Errors</h3>
      {isSubmitted && errors.length > 0 && <ValidationErrors errors={errors} />}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="title"
              type="text"
              value={course.title}
              onChange={handleChange}
            />
            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="description"
              value={course.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={course.estimatedTime}
              onChange={handleChange}
            />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={course.materialsNeeded}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

// Exports the UpdateCourse component
export default UpdateCourse;