// import {
//   Box,
//   Button,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import { Container } from "@mui/system";
// import { useState, useEffect } from "react";
// import axios from "../sevices/api";
// import { useDispatch, useSelector } from "react-redux";
// import { setTasks } from "../redux/TaskSlice";
// import Header from "./Header";
// import { Link } from "react-router-dom";
// import Task from "../components/Task";
// import Stack from "@mui/material/Stack";
// const Home = () => {
//   const dispatch = useDispatch();
//   const [typeFilter, setTypeFilter] = useState("");
//   const [dayFilter, setDayFilter] = useState("");
//   const types = ["default", "personal", "shopping", "wishlist", "work"];
//   const days = [
//     { label: "Today", value: "today" },
//     { label: "Last seven", value: "seven" },
//     { label: "Last Thirty", value: "thirty" },
//   ];
//   useEffect(() => {
//     axios.get(`/task?type=${typeFilter}&day=${dayFilter}`).then((res) => {
//       dispatch(setTasks(res.data.tasks));
//     });
//   }, [typeFilter, dayFilter]);
//   const { tasks } = useSelector((state) => state.task);

//   const handleTypeChange = (e) => {
//     setTypeFilter(e.target.value);
//   };

//   return (
//     <Box>
//       <Header />
//       <Container>
//         <Box display="flex" justifyContent="space-between" mt="2rem">
//           <FormControl style={{ minWidth: 150 }}>
//             <InputLabel>Select Type</InputLabel>
//             <Select value={typeFilter} onChange={handleTypeChange}>
//               {types.map((type, idx) => (
//                 <MenuItem key={`${idx}-${type}`} value={type}>
//                   {type}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Stack direction="row" spacing={2}>
//             {days.map((day, idx) => (
//               <Button
//                 variant="contained"
//                 size="small"
//                 color={day.value === dayFilter ? "success" : "secondary"}
//                 key={`${idx}-${day.value}`}
//                 onClick={() => {
//                   setDayFilter(day.value);
//                 }}
//               >
//                 {day.label}
//               </Button>
//             ))}
//             <Link to="/task/create" style={{ textDecoration: "none" }}>
//               <Button variant="contained" size="small" color="secondary">
//                 Create Task
//               </Button>
//             </Link>
//           </Stack>
//         </Box>
//         <Box display="flex" justifyContent="space-between">
//           <Button
//             onClick={() => {
//               setTypeFilter("");
//               setDayFilter("");
//             }}
//           >
//             Clear filters
//           </Button>
//         </Box>
//         <Box mt="2rem">
//           <Grid container spacing={2}>
//             {tasks.map((task, idx) => (
//               <Grid item xs={12} md={3} key={`${idx}-${task.id}`}>
//                 <Link
//                   style={{ textDecoration: "none" }}
//                   to={`/task/${task._id}`}
//                 >
//                   <Task task={task} />
//                 </Link>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Container>
//     </Box>
//   );
// };
// export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "../services/api";
// import { useDispatch, useSelector } from "react-redux";
// import { setTasks } from "../redux/TaskSlice";
// import Header from "./Header";
// import { Link, useNavigate } from "react-router-dom";
// import Task from "../components/Task";
// import "../css/Home.css"; // Import your CSS file
// import { deleteTask } from "../redux/TaskSlice";
// import axiosInstance from "../services/api.js";

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [typeFilter, setTypeFilter] = useState("");
//   const [dayFilter, setDayFilter] = useState("");
//   const types = ["default", "personal", "shopping", "wishlist", "work"];
//   const days = [
//     { label: "Today", value: "today" },
//     { label: "This Week", value: "week" },
//     { label: "This Month", value: "month" },
//   ];

//   const { tasks } = useSelector((state) => state.task);
//   useEffect(() => {
//     axios.get(`/task?type=${typeFilter}&day=${dayFilter}`).then((res) => {
//       dispatch(setTasks(res.data.tasks));
//     });
//   }, [typeFilter, dayFilter, tasks]);

//   const handleTypeChange = (e) => {
//     setTypeFilter(e.target.value);
//   };

//   const clearFilters = () => {
//     setTypeFilter("");
//     setDayFilter("");
//   };

//   const handleDelete = async (taskID) => {
//     try {
//       await axiosInstance.delete(`task/${taskID}`); // Await the API call
//       //console.log(response);
//       dispatch(deleteTask(taskID));
//       navigate("/home", { replace: true }); // Navigate after state update
//     } catch (error) {
//       console.error("Error deleting task:", error);
//       // Handle errors (e.g., display error message to user)
//     }
//   };

//   return (
//     <div className="home-container">
//       <Header />
//       <div className="home-content">
//         <div className="filters-container">
//           <div className="filter-section">
//             <label>Select Type:</label>
//             <select value={typeFilter} onChange={handleTypeChange}>
//               <option value="">All</option>
//               {types.map((type, idx) => (
//                 <option key={`${idx}-${type}`} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="filter-section">
//             <span>Filter by Date:</span>
//             <div className="filter-buttons">
//               {days.map((day, idx) => (
//                 <button
//                   key={`${idx}-${day.value}`}
//                   className={`filter-button ${
//                     day.value === dayFilter ? "active" : ""
//                   }`}
//                   onClick={() => setDayFilter(day.value)}
//                 >
//                   {day.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="filter-section">
//             <Link to="/task/create" className="create-task-link">
//               Create Task
//             </Link>
//           </div>
//           <div className="filter-section">
//             <button className="clear-filters-button" onClick={clearFilters}>
//               Clear Filters
//             </button>
//           </div>
//         </div>
//         <div className="tasks-container">
//           {tasks.map((task, idx) => (
//             <div className="task-item" key={`${idx}-${task.id}`}>
//               <Link to={`/task/${task._id}`} className="task-link">
//                 <Task task={task} onDelete={() => handleDelete(task._id)} />
//               </Link>
//               <button
//                 className="task-delete-button"
//                 onClick={() => handleDelete(task._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "../services/api";
// import { useDispatch, useSelector } from "react-redux";
// import { setTasks } from "../redux/TaskSlice";
// import Header from "./Header";
// import { Link, useNavigate } from "react-router-dom";
// import Task from "../components/Task";
// import "../css/Home.css"; // Import your CSS file
// import { deleteTask } from "../redux/TaskSlice";
// import axiosInstance from "../services/api.js";
// import dayjs from "dayjs";

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [typeFilter, setTypeFilter] = useState("");
//   const [dayFilter, setDayFilter] = useState("");
//   const types = ["default", "personal", "shopping", "wishlist", "work"];
//   const days = [
//     { label: "Today", value: "today" },
//     { label: "This Week", value: "week" },
//     { label: "This Month", value: "month" },
//   ];

//   const { tasks } = useSelector((state) => state.task);

//   useEffect(() => {
//     axios.get(`/task?type=${typeFilter}&day=${dayFilter}`).then((res) => {
//       dispatch(setTasks(res.data.tasks));
//     });
//   }, [typeFilter, dayFilter, dispatch]);

//   const handleTypeChange = (e) => {
//     setTypeFilter(e.target.value);
//   };

//   const clearFilters = () => {
//     setTypeFilter("");
//     setDayFilter("");
//   };

//   const handleDelete = async (taskID) => {
//     try {
//       await axiosInstance.delete(`task/${taskID}`);
//       dispatch(deleteTask(taskID));
//       navigate("/home", { replace: true });
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Filter tasks into different categories
//   const today = dayjs();

//   const pendingTasks = tasks.filter(
//     (task) =>
//       task.status === "pending" &&
//       !dayjs(`${task.date.split("T")[0]}T${task.time}`).isBefore(today)
//   );
//   const completedTasks = tasks.filter((task) => task.status === "completed");
//   const missedDeadlineTasks = tasks.filter(
//     (task) =>
//       task.status === "pending" &&
//       dayjs(`${task.date.split("T")[0]}T${task.time}`).isBefore(today)
//   );

//   return (
//     <div className="home-container">
//       <Header />
//       <div className="home-content">
//         <div className="filters-container">
//           <div className="filter-section">
//             <label>Select Type:</label>
//             <select value={typeFilter} onChange={handleTypeChange}>
//               <option value="">All</option>
//               {types.map((type, idx) => (
//                 <option key={`${idx}-${type}`} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="filter-section">
//             <span>Filter by Date:</span>
//             <div className="filter-buttons">
//               {days.map((day, idx) => (
//                 <button
//                   key={`${idx}-${day.value}`}
//                   className={`filter-button ${
//                     day.value === dayFilter ? "active" : ""
//                   }`}
//                   onClick={() => setDayFilter(day.value)}
//                 >
//                   {day.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="filter-section">
//             <Link to="/task/create" className="create-task-link">
//               Create Task
//             </Link>
//           </div>
//           <div className="filter-section">
//             <button className="clear-filters-button" onClick={clearFilters}>
//               Clear Filters
//             </button>
//           </div>
//         </div>
//         <div className="tasks-container">
//           <div className="task-category">
//             <h2>Pending Tasks</h2>
//             {pendingTasks.map((task, idx) => (
//               <div className="task-item" key={`${idx}-${task.id}`}>
//                 <Link to={`/task/${task._id}`} className="task-link">
//                   <Task task={task} onDelete={() => handleDelete(task._id)} />
//                 </Link>
//                 <button
//                   className="task-delete-button"
//                   onClick={() => handleDelete(task._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="task-category">
//             <h2>Completed Tasks</h2>
//             {completedTasks.map((task, idx) => (
//               <div className="task-item" key={`${idx}-${task.id}`}>
//                 <Link to={`/task/${task._id}`} className="task-link">
//                   <Task task={task} onDelete={() => handleDelete(task._id)} />
//                 </Link>
//                 <button
//                   className="task-delete-button"
//                   onClick={() => handleDelete(task._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="task-category">
//             <h2>Missed Deadline Tasks</h2>
//             {missedDeadlineTasks.map((task, idx) => (
//               <div className="task-item" key={`${idx}-${task.id}`}>
//                 <Link to={`/task/${task._id}`} className="task-link">
//                   <Task task={task} onDelete={() => handleDelete(task._id)} />
//                 </Link>
//                 <button
//                   className="task-delete-button"
//                   onClick={() => handleDelete(task._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/TaskSlice";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Task from "../components/Task";
import "../css/Home.css"; // Import your CSS file
import { deleteTask } from "../redux/TaskSlice";
import axiosInstance from "../services/api.js";
import dayjs from "dayjs";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const types = ["default", "personal", "shopping", "wishlist", "work"];
  const days = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ];

  const { tasks } = useSelector((state) => state.task);

  useEffect(() => {
    axios.get(`/task?type=${typeFilter}&day=${dayFilter}`).then((res) => {
      dispatch(setTasks(res.data.tasks));
    });
  }, [typeFilter, dayFilter, tasks]);

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const clearFilters = () => {
    setTypeFilter("");
    setDayFilter("");
  };

  const handleDelete = async (taskID) => {
    try {
      await axiosInstance.delete(`task/${taskID}`);
      dispatch(deleteTask(taskID));
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Filter tasks into different categories
  const today = dayjs();

  const pendingTasks = tasks.filter(
    (task) =>
      task.status === "pending" &&
      !dayjs(`${task.date.split("T")[0]}T${task.time}`).isBefore(today)
  );
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const missedDeadlineTasks = tasks.filter(
    (task) =>
      task.status === "pending" &&
      dayjs(`${task.date.split("T")[0]}T${task.time}`).isBefore(today)
  );

  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <div className="filters-container">
          <div className="filter-section">
            <label>Select Type:</label>
            <select value={typeFilter} onChange={handleTypeChange}>
              <option value="">All</option>
              {types.map((type, idx) => (
                <option key={`${idx}-${type}`} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-section">
            <span>Filter by Date:</span>
            <div className="filter-buttons">
              {days.map((day, idx) => (
                <button
                  key={`${idx}-${day.value}`}
                  className={`filter-button ${
                    day.value === dayFilter ? "active" : ""
                  }`}
                  onClick={() => setDayFilter(day.value)}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <Link to="/task/create" className="create-task-link">
              Create Task
            </Link>
          </div>
          <div className="filter-section">
            <button className="clear-filters-button" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
        <div className="tasks-container">
          {pendingTasks.length > 0 && (
            <div className="task-category">
              <h2>Pending Tasks</h2>
              <div className="task-items">
                {pendingTasks.map((task, idx) => (
                  <div className="task-item" key={`${idx}-${task.id}`}>
                    <Link to={`/task/${task._id}`} className="task-link">
                      <Task
                        task={task}
                        onDelete={() => handleDelete(task._id)}
                      />
                    </Link>
                    <button
                      className="task-delete-button"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div className="task-category">
              <h2>Completed Tasks</h2>
              <div className="task-items">
                {completedTasks.map((task, idx) => (
                  <div className="task-item" key={`${idx}-${task.id}`}>
                    <Link to={`/task/${task._id}`} className="task-link">
                      <Task
                        task={task}
                        onDelete={() => handleDelete(task._id)}
                      />
                    </Link>
                    <button
                      className="task-delete-button"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {missedDeadlineTasks.length > 0 && (
            <div className="task-category">
              <h2>Deadline Missed</h2>
              <div className="task-items">
                {missedDeadlineTasks.map((task, idx) => (
                  <div className="task-item" key={`${idx}-${task.id}`}>
                    <Link to={`/task/${task._id}`} className="task-link">
                      <Task
                        task={task}
                        onDelete={() => handleDelete(task._id)}
                      />
                    </Link>
                    <button
                      className="task-delete-button"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display "Nothing to show" messages */}
          {pendingTasks.length === 0 && (
            <div className="task-category">
              <h2>Pending Tasks</h2>
              <p>Nothing to show</p>
            </div>
          )}

          {completedTasks.length === 0 && (
            <div className="task-category">
              <h2>Completed Tasks</h2>
              <p>Nothing to show</p>
            </div>
          )}

          {missedDeadlineTasks.length === 0 && (
            <div className="task-category">
              <h2>Deadline Missed</h2>
              <p>Nothing to show</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
