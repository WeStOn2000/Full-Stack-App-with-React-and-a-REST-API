import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Courses from './courses';
// Add other components (CourseDetail, CreateCourse) as needed

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/create" component/>
        <Route path="/courses/:id" component/>
        {/* Add a 404 or No Match Route if needed */}
      </Switch>
    </Router>
  );
};

export default Routes;
