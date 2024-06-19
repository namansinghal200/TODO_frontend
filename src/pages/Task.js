// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "../sevices/api.js";
// import { setTask } from "../redux/TaskSlice";
// import { Box, Container } from "@mui/system";
// import Header from "./Header";
// import Taskform from "../components/Taskform";
// const Task = () => {
//   const { id } = useParams();
//   const [currentTask, setCurrentTask] = useState(null);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     async function fetchTask() {
//       await axios.get(`/task/${id}`).then((res) => {
//         setCurrentTask(res.data.task);
//         dispatch(setTask(res.data.task));
//       });
//     }
//     fetchTask();
//   }, [id, dispatch]);

//   if (!currentTask) {
//     return;
//   }
//   return (
//     <Box>
//       <Header />
//       <Container>
//         <Taskform task={currentTask} />
//       </Container>
//     </Box>
//   );
// };
// export default Task;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../services/api";
import { setTask } from "../redux/TaskSlice";
import Header from "./Header";
import TaskForm from "../components/Taskform"; // Assuming TaskForm is a separate component
import "../css/Taskform.css";

const Task = () => {
  const { id } = useParams();
  const [currentTask, setCurrentTask] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await axios.get(`/task/${id}`);
        dispatch(setTask(response.data.task));
        setCurrentTask(response.data.task);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    }
    fetchTask();
  }, [id, dispatch]);

  if (!currentTask) {
    return null; // You might want to render a loading indicator here
  }

  return (
    <div>
      <div className="taskform-container">
        <Header />
        <div>
          <TaskForm task={currentTask} />
        </div>
      </div>
    </div>
  );
};

export default Task;
