//imports the hooks and reactcontext
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  // Using useNavigate hook to programmatically navigate the user
  const navigate = useNavigate();
  // Accessing authenticated user data from UserContext
  const { authUser } = useContext(UserContext);
  // State to hold course data
  const [course, setCourse] = useState({
    userId: authUser.id,
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  });

  // State to hold any validation or error messages
  const [errors, setErrors] = useState([]);
  // Handle form field changes
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses",
        course,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${authUser.authToken}`, // Use authUser's token
          },
        }
      );
      if (response.status === 201) {
        const { courseId } = response.data;
        navigate(`/courses/${courseId}`); // Redirect after successful creation
      }
    } catch (error) {
      if (error.response) {
        // Handle 400 error and display validation messages from the server
        if (
          error.response.status === 400 &&
          error.response.data.message.errors
        ) {
          setErrors(error.response.data.message.errors);
        } else {
          // For other errors (like 500 or no response from the server)
          setErrors(["An unexpected error occurred."]);
          navigate("/error");
        }
      } else {
        // No response from server (network issue or CORS)
        setErrors(["No response from the server."]);
        navigate("/error");
      }
    }
  };
  //redirects user to home page
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
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
                name="title"
                type="text"
                value={course.title}
                onChange={handleChange}
              />
              <p>
                By {authUser.firstName} {authUser.lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="description"
                value={course.description}
                onChange={handleChange}
              ></textarea>
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
// exports the component
export default CreateCourse;
