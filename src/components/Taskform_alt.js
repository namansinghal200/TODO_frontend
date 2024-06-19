import React, { useState, useEffect } from "react";
import axiosInstance from "../services/api.js"; 
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "../css/Taskform.css";

const TaskForm = ({ mode = "edit", task }) => {
  const navigate = useNavigate();
  const types = ["default", "personal", "shopping", "wishlist", "work"];

  const [values, setValues] = useState({
    name: "",
    type: "default",
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs().format("HH:mm"),
    status: "pending",
    collaborators: "", // Add collaborators field
  });

  const [errors, setErrors] = useState({});
  const [searchEmail, setSearchEmail] = useState(""); // State to hold the search email

  useEffect(() => {
    if (mode === "edit" && task) {
      setValues({
        name: task.name,
        type: task.type,
        date: task.date.split("T")[0],
        time: task.time,
        status: task.status || "",
        collaborators: task.collaborators || "", // Set collaborators if editing
      });
    }
  }, [mode, task]);

  const validate = () => {
    const errors = {};
    if (!values.name) errors.name = "Required";
    if (!values.date) errors.date = "Required";
    if (!values.time) errors.time = "Required";
    if (!values.type) errors.type = "Required";
    if (mode === "edit" && !values.status) errors.status = "Required";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };


const handleSearchUser = async (email) => {
    try {
      const response = await axiosInstance.get(`/auth/searchUser?email=${email}`);
      const foundUserId = response.data.user?._id; // Assuming the API returns the userId
      if (foundUserId) {
        setValues({ ...values, collaborators: values.collaborators + foundUserId + "," });
        setSearchEmail(""); // Clear the search email after finding the user
      } else {
        // Handle case where user is not found
        console.log("User not found.");
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      // Handle error or display error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formData = { ...values };
      formData.collaborators = formData.collaborators
        .split(",") // Split by comma
        .map((collab) => collab.trim()); // Trim spaces

      try {
        if (mode === "edit") {
          const response = await axiosInstance.put(`/task/${task._id}`, formData);
          // onUpdate(response.data.task); // Call onUpdate to update task state
        } else {
          const response = await axiosInstance.post(`/task/create`, formData);
          // onUpdate(response.data.task); // Call onUpdate to update task state
        }
        navigate("/home");
      } catch (error) {
        console.error("Error submitting task:", error);
        // Handle error or display error message
      }
    }
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="taskform-container">
      <div className="taskform-title">
        {mode === "edit" ? "Edit the task" : "Create a task"}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="taskform-group">
          <label htmlFor="name">Task name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <div className="taskform-error">{errors.name}</div>}
        </div>
        
        {/* Add collaborators field */}
      <div className="taskform-group">
        <label htmlFor="collaborators">Collaborators (User IDs separated by commas)</label>
        <div>
          <input
            id="collaborators"
            name="collaborators"
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Add collaborators by email"
          />
          <button type="button" onClick={() => handleSearchUser(searchEmail)}>Add</button>
        </div>
      </div>

        <div className="taskform-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
          />
          {errors.date && <div className="taskform-error">{errors.date}</div>}
        </div>

        <div className="taskform-group">
          <label htmlFor="time">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            value={values.time}
            onChange={handleChange}
          />
          {errors.time && <div className="taskform-error">{errors.time}</div>}
        </div>

        <div className="taskform-group">
          <label htmlFor="type">Task type</label>
          <select
           
           id="type"
           name="type"
           value={values.type}
           onChange={handleChange}
         >
           {types.map((type, idx) => (
             <option value={type} key={`${idx}-${type}`}>
               {type}
             </option>
           ))}
         </select>
         {errors.type && <div className="taskform-error">{errors.type}</div>}
       </div>

       {mode === "edit" && (
         <div className="taskform-group">
           <label htmlFor="status">Status</label>
           <select
             id="status"
             name="status"
             value={values.status}
             onChange={handleChange}
           >
             <option value="pending">Pending</option>
             <option value="completed">Completed</option>
           </select>
           {errors.status && (
             <div className="taskform-error">{errors.status}</div>
           )}
         </div>
       )}

       <div className="taskform-buttons">
         <button type="submit" className="taskform-submit-button">
           {mode === "edit" ? "Edit Task" : "Create Task"}
         </button>
         <button
           type="button"
           className="taskform-back-button"
           onClick={handleBack}
         >
           Back
         </button>
       </div>
     </form>
   </div>
 );
};

export default TaskForm;
