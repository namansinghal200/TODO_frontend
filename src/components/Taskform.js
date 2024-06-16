// import { Formik } from "formik";
// import * as Yup from "yup";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import {
//   MenuItem,
//   TextField,
//   Typography,
//   useMediaQuery,
//   Box,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { Button, Select } from "@mui/material";
// import { useState } from "react";
// import axiosInstance from "../sevices/api.js";
// import { useNavigate } from "react-router-dom";
// const initialEditSchema = Yup.object().shape({
//   name: Yup.string().required("Required"),
//   date: Yup.string().required("required"),
//   type: Yup.string().required("Required"),
//   time: Yup.string().required("Required"),
//   status: Yup.string().required("Required"),
// });

// const initialCreateSchema = Yup.object().shape({
//   name: Yup.string().required("Required"),
//   date: Yup.string().required("required"),
//   type: Yup.string().required("Required"),
//   time: Yup.string().required("Required"),
// });

// let initialValues = {
//   name: "",
//   type: "",
//   date: dayjs().format("YYYY-MM-DD"),
//   time: dayjs(),
// };
// const TaskForm = ({ mode = "edit", task }) => {
//   const navigate = useNavigate();
//   const types = ["default", "personal", "shopping", "wishlist", "work"];
//   const handleFormSubmit = (values, onSubmitProps) => {
//     if (mode === "edit") {
//       axiosInstance.put(`/task/${values._id}`, values).then((res) => {
//         navigate("/home");
//       });
//     } else {
//       values.time = values.time.format("HH:mm");
//       axiosInstance.post(`/task/create`, values).then((res) => {
//         navigate("/home");
//       });
//     }
//   };
//   const isNotMobile = useMediaQuery("(min-width: 768px)");
//   const [date, setDate] = useState(null);
//   const [time, setTime] = useState(null);
//   return (
//     <Formik
//       onSubmit={handleFormSubmit}
//       initialValues={mode === "create" ? initialValues : task}
//       validationSchema={
//         mode === "create" ? initialCreateSchema : initialEditSchema
//       }
//     >
//       {({
//         handleSubmit,
//         handleBlur,
//         touched,
//         resetForm,
//         values,
//         handleChange,
//         errors,
//       }) => (
//         <Box p="2rem 0" m="2rem auto" width={isNotMobile ? "50%" : "90%"}>
//           {mode === "edit" ? (
//             <Typography textAlign="center" mb="2rem">
//               Edit the task
//             </Typography>
//           ) : (
//             <Typography textAlign="center" mb="2rem">
//               Create a task
//             </Typography>
//           )}
//           <form onSubmit={handleSubmit}>
//             <Box display="flex" flexDirection="column" gap="30px">
//               <TextField
//                 label="Task name"
//                 value={values.name}
//                 name="name"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={Boolean(touched.name) && Boolean(errors.name)}
//                 helperText={touched.name && errors.name}
//               />
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   label="Date"
//                   value={
//                     mode === "edit" ? dayjs(values.date || null) : dayjs(null)
//                   }
//                   minDate={mode === "edit" ? null : dayjs()}
//                   onChange={(newValue) => {
//                     values.date = newValue.format("YYYY-MM-DD");
//                     setDate(values.date);
//                   }}
//                   onBlur={handleBlur}
//                   name="date"
//                   renderInput={(params) => (
//                     <TextField {...params} helperText="Select Date" />
//                   )}
//                   error={Boolean(touched.date) && Boolean(errors.date)}
//                 />
//               </LocalizationProvider>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <TimePicker
//                   label="Time"
//                   value={
//                     mode === "edit"
//                       ? dayjs(
//                           `${values.date.split("T")[0]}T${values.time}` || null
//                         )
//                       : dayjs(null)
//                   }
//                   onChange={(newValue) => {
//                     values.time = newValue;
//                     setTime(values.time);
//                   }}
//                   name="time"
//                   onBlur={handleBlur}
//                   error={Boolean(touched.time) && Boolean(errors.time)}
//                   renderInput={(params) => (
//                     <TextField {...params} helperText="Set Time" />
//                   )}
//                 />
//               </LocalizationProvider>
//               <FormControl>
//                 <InputLabel>Select Type</InputLabel>
//                 <Select
//                   label="Task type"
//                   value={values.type}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   name="type"
//                   error={Boolean(touched.type) && Boolean(errors.type)}
//                 >
//                   {types.map((type, idx) => (
//                     <MenuItem value={type} key={`${idx}-${type}`}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               {mode === "edit" && (
//                 <FormControl>
//                   <InputLabel>Status</InputLabel>
//                   <Select
//                     label="Status"
//                     value={values.status}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     name="status"
//                   >
//                     <MenuItem value="pending">Pending</MenuItem>
//                     <MenuItem value="completed">Completed</MenuItem>
//                   </Select>
//                 </FormControl>
//               )}
//               <Button
//                 variant="outlined"
//                 type="submit"
//                 m="2rem 0"
//                 p="1rem 0"
//                 background="#00D5FA"
//               >
//                 {mode === "edit" ? "Edit Task" : "Create Task"}
//               </Button>
//             </Box>
//           </form>
//         </Box>
//       )}
//     </Formik>
//   );
// };

// export default TaskForm;

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
    type: "",
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs().format("HH:mm"),
    status: "",
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
