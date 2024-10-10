import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import ValidationErrors from './ValidationErrors';

const CreateCourse = () => {
  const { authUser } = useContext(UserContext); 
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/courses', {
        ...courseDetails,
        userId: authUser.id,
      });
      navigate('/');
    } catch (error) {
      if (error.response.status === 400) {
        setErrors(error.response.Details.errors);
      }
    }
  };

  return (
    <div>
      <h2>Create Course</h2>
      <ValidationErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={courseDetails.title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={courseDetails.description} onChange={handleChange} required />
        </label>
        <label>
          Estimated Time:
          <input type="text" name="estimatedTime" value={courseDetails.estimatedTime} onChange={handleChange} />
        </label>
        <label>
          Materials Needed:
          <textarea name="materialsNeeded" value={courseDetails.materialsNeeded} onChange={handleChange} />
        </label>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
