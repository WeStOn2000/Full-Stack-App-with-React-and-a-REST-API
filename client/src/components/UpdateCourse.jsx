import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import ValidationErrors from './ValidationErrors';

const UpdateCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
  });
  const [errors, setErrors] = useState([]);

  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course details', error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/courses/${id}`, {
        userId: authUser.id,
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded
      });
      navigate(`/courses/${id}`);
    } catch (error) {
        if (error.response.status === 400) {
          setErrors(error.response.data.errors);
        }
      }
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <ValidationErrors errors={errors} />

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
        <button className="button" type="submit">Update Course</button>
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

export default UpdateCourse;