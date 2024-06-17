// import React from "react";
// import "../css/Task.css";

// const Task = ({ task }) => {
//   return (
//     <div className="task-card">
//       <div className="task-content">
//         <h5 className="task-title">{task.name}</h5>
//         <p className="task-date">Date: {task.date.split("T")[0]}</p>
//         <p className="task-type">{task.type}</p>
//         <p className="task-status">{task.status}</p>
//       </div>
//     </div>
//   );
// };

// export default Task;

import React from "react";
import "../css/Task.css";
import dayjs from "dayjs";

const Task = ({ task }) => {
  const today = dayjs();
  const taskDeadline = dayjs(`${task.date.split("T")[0]}T${task.time}`);
  const daysRemaining = taskDeadline.diff(today, "day");
  const isOverdue = taskDeadline.isBefore(today);

  let taskClass = "task-card ";

  if (task.status === "completed") {
    taskClass += "task-completed";
  } else if (task.status === "pending") {
    if (isOverdue) {
      taskClass += "task-missed-deadline";
    } else if (daysRemaining <= 1) {
      taskClass += "task-pending-urgent";
    } else if (daysRemaining <= 7) {
      taskClass += "task-pending-soon";
    } else if (daysRemaining <= 30) {
      taskClass += "task-pending-upcoming";
    } else {
      taskClass += "task-pending-normal";
    }
  }
  return (
    <div className={taskClass}>
      <div className="task-content">
        <h5 className="task-title">{task.name}</h5>
        <p className="task-date">
          Deadline:{" "}
          {dayjs(`${task.date.split("T")[0]}T${task.time}`).format(
            "YYYY-MM-DD HH:mm"
          )}
        </p>
        <p className="task-type">{task.type}</p>
        <p className="task-status">{isOverdue ? "overdue" : task.status}</p>
      </div>
    </div>
  );
};

export default Task;
