// Import React hooks for managing state and lifecycle methods, axios for making HTTP requests, and Link from react-router-dom for navigation
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Courses = () => {
  // State to hold the list of courses
  const [courses, setCourses] = useState([]);
  // useEffect hook to fetch the list of courses when the component is mounted
  useEffect(() => {
    //Fetch the list of courses from the API
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses: ", error);
      });
  }, []);

  return (
    <main>
      <div className="wrap main--grid">
        {courses.map((course) => (
          <Link
            key={course.id}
            className="course--module course--link"
            to={`courses/${course.id}`}
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        ))}

        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};
//exports the component
export default Courses;
