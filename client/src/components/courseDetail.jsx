// Importing necessary hooks and libraries
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ReactMarkdown from "react-markdown";

// CourseDetail component displays detailed information about a specific course
const CourseDetail = () => {
  const { id } = useParams(); // Retrieve the course ID from the URL
  const { authUser } = useContext(UserContext); // Access the authenticated user
  const navigate = useNavigate(); // Hook to programmatically navigate

  // State variables for course data, loading status, and error handling
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course details when the component mounts or when the course ID changes
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/courses/${id}`)
        .then((response) => {
          const courseData = response.data; // Retrieve course data from the response
          setCourse(courseData); // Set course data to state
          setLoading(false); // Set loading to false
        })
        .catch(() => {
          setError("Course not found"); // Set error message if the course is not found
          setLoading(false); // Set loading to false
        });
    } else {
      setLoading(false); // If there's no ID, stop loading
      setError("Invalid course ID"); // Set error message for invalid course ID
    }
  }, [id]);

  // Handle course deletion
  const handleDeleteCourse = async () => {
    // Confirm deletion from the user
    if (window.confirm("Delete this course? (Action cannot be undone)")) {
      try {
        // Send DELETE request to the API
        await axios.delete(`http://localhost:5000/api/courses/${id}`, {
          headers: {
            Authorization: `Basic ${authUser.authToken}`, // Include authorization token
          },
        });
        navigate("/"); // Navigate back to the course list after deletion
      } catch {
        setError("Failed to delete course"); // Set error message if deletion fails
      }
    }
  };

  // Handles loading and error states
  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>{error}</p>; // Display error message

  return (
    <>
      <main>
        {/* Action buttons for updating and deleting course */}
        <div className="actions--bar">
          <div className="wrap">
            {authUser && authUser.id === course.userId && ( // Check if the user is the course owner
              <>
                <Link className="button" to={`/courses/${id}/update`}>
                  Update Course
                </Link>
                <button className="button" onClick={handleDeleteCourse}>
                  Delete Course
                </button>
              </>
            )}
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>

        {/* Course detail section */}
        <div className="wrap">
          <h2>Course Detail</h2>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4> {/* Display course title */}
              <p>
                By {course.User ? `${course.User.firstName} ${course.User.lastName}` : "Unknown"} {/* Display course author */}
              </p>
              <ReactMarkdown>{course.description}</ReactMarkdown> {/* Render course description using ReactMarkdown */}
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p> {/* Display estimated time for the course */}
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown> {/* Render materials needed using ReactMarkdown */}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

// Exports the CourseDetail component
export default CourseDetail;
