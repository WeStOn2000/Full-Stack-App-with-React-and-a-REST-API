// App.js
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import {  UserProvider } from './context/UserContext';
//Import components
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import Header from './components/header';
import CourseDetail from './components/courseDetail';
import Courses from './components/courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <UserProvider>
     <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/courses/create" element={<PrivateRoute />}>
            <Route path="" element={<CreateCourse />} />
          </Route>
          <Route path="/courses/:id/update" element={<PrivateRoute />}>
            <Route path="" element={<UpdateCourse />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;