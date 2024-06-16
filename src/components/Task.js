// import {
//   Card,
//   Box,
//   CardContent,
//   CardActionArea,
//   Typography,
//   Button,
// } from "@mui/material";
// const Task = ({ task }) => {
//   return (
//     <>
//       <Card>
//         <CardActionArea>
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {task.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Date: {task.date.split("T")[0]}
//             </Typography>
//             .<Typography sx={{ p: 0 }}>{task.type}</Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     </>
//   );
// };
// export default Task;

import React from "react";
import "../css/Task.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Task = ({ task, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleDelete = async () => {
  //   try {
  //     const response = await axiosInstance.delete(`task/${task._id}`); // Await the API call
  //     console.log(response);
  //     dispatch(deleteTask(task._id));
  //     navigate("/home", { replace: true }); // Navigate after state update
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //     // Handle errors (e.g., display error message to user)
  //   }
  // };
  const handleTaskDelete = () => {
    onDelete(task._id);
  };
  return (
    <div className="task-card">
      <div className="task-content">
        <h5 className="task-title">{task.name}</h5>
        <p className="task-date">Date: {task.date.split("T")[0]}</p>
        <p className="task-type">{task.type}</p>
        {/* <button className="task-delete-button" onClick={handleTaskDelete}>
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default Task;
