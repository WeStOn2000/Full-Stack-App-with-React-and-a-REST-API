// Import necessary hooks and components
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import ValidationErrors from "./ValidationErrors";

const UpdateCourse = () => {
  // State to manage the course details and any validation errors
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  });
  const [errors, setErrors] = useState([]);

  // Get the course id from the URL parameters and authenticated user info from context
  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  //fetch course details on component mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        const courseData = response.data;
  
        if (courseData.userId !== authUser?.id) { // Correct ownership check
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

  // Handle form submission to update the course details
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("AuthUser:", authUser); // Debugging
    try {
      await axios.put(
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
      navigate(`/courses/${id}`); // Redirect to course detail page after successful update
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      } else { 
        navigate("/error"); // Redirect to error page on server error
      }
    }
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {errors.length > 0 && <ValidationErrors errors={errors} />}

      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            {/* Aligned with form input and textarea styling */}
            <label>Course Title</label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              required
            />
            <label>Description</label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Estimated Time</label>
            <input
              type="text"
              name="estimatedTime"
              value={course.estimatedTime}
              onChange={handleChange}
            />
            <label>Materials Needed</label>
            <textarea
              name="materialsNeeded"
              value={course.materialsNeeded}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button
          className="button button-secondary"
          onClick={() => navigate(`/courses/${id}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
//exports the component
export default UpdateCourse;
