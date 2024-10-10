import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => console.error('Error fetching course details:', error));
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
          <Link className="button" to="#">Delete Course</Link>
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