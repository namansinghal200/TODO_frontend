import React, { useState, useEffect } from "react";
import "../css/Taskform.css";
import dayjs from "dayjs";
import axiosInstance from "../services/api.js";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ mode = "edit", task }) => {
  const navigate = useNavigate();
  const types = ["default", "personal", "shopping", "wishlist", "work"];

  const [values, setValues] = useState({
    name: "",
    type: "default",
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs().format("HH:mm"),
    status: "pending",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && task) {
      setValues({
        name: task.name,
        type: task.type,
        date: task.date.split("T")[0],
        time: task.time,
        status: task.status || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      if (mode === "edit") {
        axiosInstance.put(`/task/${task._id}`, values).then((res) => {
          navigate("/home");
        });
      } else {
        axiosInstance.post(`/task/create`, values).then((res) => {
          navigate("/home");
        });
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
