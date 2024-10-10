import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="wrap main--grid">
      {courses.map(course => (
        <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}
      <Link to="/courses/create" className="course--module course--add--module">
        <span className="course--add--title">
        </span>
      </Link>
    </div>
  );
};

export default Courses;