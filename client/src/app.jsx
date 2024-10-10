import { Routes, Route } from "react-router-dom";
import "./global.css";
import Header from "./components/header";
import Courses from "./components/courses";

function App() {
  return (
    <div>
        <Header />
      <Routes>
        <Route path='/' element={<Courses />}/>
      </Routes>
    </div>
  );
}

export default App;
