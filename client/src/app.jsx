/**
 * App file that acquires components and sets the routes that are needed for the react web application
 */

import { Route, Routes } from "react-router-dom";
//importing components
import Courses from "./components/courses";
import Header from "./components/header";
import CourseDetail from "./components/courseDetail";
import CreateCourse from "./components/CreateCourse";
import Error from "./components/Error";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/error" element={<Error />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/signup" element={<UserSignUp />} />
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
          </Route>

          {/* Anything Else */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
//Exports the app component to the main.jsx to be rendered to the DOM
export default App;
