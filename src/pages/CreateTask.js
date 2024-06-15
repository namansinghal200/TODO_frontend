import Taskform from "../components/Taskform";
import Header from "./Header";
const TaskCreate = () => {
  return (
    <div>
      <div className="container">
        <Taskform mode="create" />
      </div>
    </div>
  );
};

export default TaskCreate;
