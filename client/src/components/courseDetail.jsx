 /**
   *Course detail component that contains the detail , deletes and updates courses 
   */
//importing hooks 
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
  const { id } = useParams(); // Retrieve the course ID from the URL
  const { user } = useContext(UserContext); // Access the Authenticated User
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(response => {
          const courseData = response.data;
          setCourse(courseData);
          setLoading(false);
        })
        .catch(error => {
          setError('Course not found',error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError('Invalid course ID');
    }
  }, [id]);

  const handleDeleteCourse = async () => {
    if (window.confirm("Delete this course? (Action cannot be undone)")) {
      try {
        const options = {
          method: "DELETE",
          url: `http://localhost:5000/api/courses/${id}`,
          headers: {
            'Authorization' : `Basic ${user.authToken}`
          }
        };
        await axios(options);
        navigate("/");
      } catch (error) {
        setError("Failed to delete course",error);
      }
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {user && user.id === course.userId && (
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

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.User ? `${course.User.firstName} ${course.User.lastName}` : 'Unknown'}</p>

              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
// exports the component
export default CourseDetail;
