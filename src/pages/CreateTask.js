import Taskform from "../components/Taskform";
import Header from "./Header";
import "../css/Taskform.css";
const TaskCreate = () => {
  return (
    <div>
      <div className="taskform-container">
        <Header />
        <Taskform mode="create" />
      </div>
    </div>
  );
};

export default TaskCreate;
