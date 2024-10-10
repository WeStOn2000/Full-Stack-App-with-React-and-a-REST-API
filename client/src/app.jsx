import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Courses from './components/courses';
import CourseDetail from './components/courseDetail';

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
        </Switch>
      </div>
    </Router>
  );
}