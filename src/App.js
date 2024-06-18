import logo from "./logo.svg";
import "./css/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Task from "./pages/Task";
import TaskCreate from "./pages/CreateTask";
import Subtasks from "./pages/Subtasks";
import { useSelector } from "react-redux";
function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="home"></Navigate>}
        />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/task/:id" element={<Task />}></Route>
        <Route path="/task/create" element={<TaskCreate />}></Route>
        <Route path="/task/:taskId/subtask" element={<Subtasks />} />
      </Routes>
    </Router>
  );
}

export default App;
