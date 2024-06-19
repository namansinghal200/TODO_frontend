import Taskform from "../components/Taskform_alt.js";
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
