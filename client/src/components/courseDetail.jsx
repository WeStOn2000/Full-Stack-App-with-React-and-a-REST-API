import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { UserContext } from '../context/UserContext'; 

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { authUser } = useContext(UserContext); 

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => console.error('Error fetching course details:', error));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authUser.token}`, 
        },
      })
        .then((response) => {
          if (response.ok) {
            alert('Course deleted successfully');
            navigate('/'); 
          } else {
            throw new Error('Failed to delete the course');
          }
        })
        .catch((error) => {
          console.error('Error deleting course:', error);
          alert('Failed to delete the course');
        });
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {authUser && authUser.id === course.user.id && (
            <>
              <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
              <button className="button" onClick={handleDelete}>Delete Course</button>
            </>
          )}
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.user.firstName} {course.user.lastName}</p>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ReactMarkdown className="course--detail--list">
                {course.materialsNeeded}
              </ReactMarkdown>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CourseDetail;
