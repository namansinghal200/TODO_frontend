// import { Formik, Form, Field, ErrorMessage } from "formik";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import axios from "../sevices/api";
// import { setLogin } from "../redux/UserSlice";
// import "../css/Login.css"; // Import your CSS file

// const initialRegisterValues = {
//   name: "",
//   email: "",
//   password: "",
//   picture: "",
// };

// const initialLoginValues = {
//   email: "",
//   password: "",
// };

// const registerSchema = Yup.object().shape({
//   name: Yup.string().required("Required"),
//   email: Yup.string().email("Not valid").required("Required"),
//   password: Yup.string().required("Required"),
// });

// const loginSchema = Yup.object().shape({
//   email: Yup.string().email("Not valid").required("Required"),
//   password: Yup.string().required("Required"),
// });

// const Login = () => {
//   const [page, setPage] = useState("login");
//   const isLogin = page === "login";
//   const isRegister = page === "register";
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = (values, onSubmitProps) => {
//     axios.post("/auth/login", values).then((res) => {
//       onSubmitProps.resetForm();
//       dispatch(setLogin(res.data.user));
//       navigate("/home");
//     });
//   };

//   const handleRegister = (values, onSubmitProps) => {
//     let formData = new FormData();
//     for (const property of Object.keys(values)) {
//       formData.append(property, values[property]);
//     }
//     axios.post("/auth/register", formData).then((res) => {
//       onSubmitProps.resetForm();
//       setPage("login");
//     });
//   };

//   const handleSubmit = (values, onSubmitProps) => {
//     if (isLogin) {
//       handleLogin(values, onSubmitProps); // Call handleLogin without resetForm (assuming no form library)
//     } else if (isRegister) {
//       handleRegister(values, onSubmitProps); // Call handleRegister without resetForm (assuming no form library)
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1 className="login-title">Welcome to Taskup</h1>
//       <Formik
//         initialValues={isLogin ? initialLoginValues : initialRegisterValues}
//         validationSchema={isLogin ? loginSchema : registerSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, isSubmitting }) => (
//           <Form className="login-form">
//             {page === "register" && (
//               <>
//                 <Field
//                   type="text"
//                   name="name"
//                   placeholder="Enter name"
//                   className="login-input"
//                 />
//                 <ErrorMessage name="name" component="div" className="error" />
//                 <Field
//                   type="file"
//                   name="picture"
//                   accept=".jpg, .png"
//                   className="login-input"
//                 />
//                 <ErrorMessage
//                   name="picture"
//                   component="div"
//                   className="error"
//                 />
//               </>
//             )}
//             <Field
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               className="login-input"
//             />
//             <ErrorMessage name="email" component="div" className="error" />
//             <Field
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               className="login-input"
//             />
//             <ErrorMessage name="password" component="div" className="error" />
//             <button
//               type="submit"
//               className="login-button"
//               disabled={isSubmitting}
//             >
//               {page === "login" ? "Login" : "Register"}
//             </button>
//             <p
//               className="login-switch"
//               onClick={() => {
//                 setPage(isLogin ? "register" : "login");
//               }}
//             >
//               {isLogin
//                 ? "Not a user, go to register"
//                 : "Already a user, go to login"}
//             </p>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Login;

// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   useMediaQuery,
// } from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import Dropzone from "react-dropzone";
// import axios from "../sevices/api.js";
// import { setLogin } from "../redux/UserSlice";

// const initialRegisterValues = {
//   name: "",
//   email: "",
//   password: "",
//   picture: "",
// };

// const initialLoginValues = {
//   email: "",
//   password: "",
// };

// const registerSchema = Yup.object().shape({
//   name: Yup.string().required("Required"),
//   email: Yup.string().email("Not valid").required("Required"),
//   password: Yup.string().required("Required"),
// });

// const loginScehma = Yup.object().shape({
//   email: Yup.string().email("Not valid").required("Required"),
//   password: Yup.string().required("Required"),
// });

// const Login = () => {
//   const [page, setPage] = useState("login");
//   const isLogin = page === "login";
//   const isRegister = page === "register";
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isNotMobile = useMediaQuery("(min-width:768px)");

//   const handleLogin = (values, onSubmitProps) => {
//     axios.post("/auth/login", values).then((res) => {
//       onSubmitProps.resetForm();
//       dispatch(setLogin(res.data.user));
//       navigate("/home");
//     });
//   };

//   const handleRegister = (values, onSubmitProps) => {
//     let formData = new FormData();
//     for (const property of Object.keys(values)) {
//       formData.append(property, values[property]);
//     }
//     axios.post("/auth/register", formData).then((res) => {
//       onSubmitProps.resetForm();
//       setPage("login");
//     });
//   };

//   const handleForm = (values, onSubmitProps) => {
//     if (isLogin) handleLogin(values, onSubmitProps);
//     if (isRegister) handleRegister(values, onSubmitProps);
//   };

//   return (
//     <Formik
//       initialValues={isLogin ? initialLoginValues : initialRegisterValues}
//       validationSchema={isLogin ? loginScehma : registerSchema}
//       onSubmit={handleForm}
//     >
//       {({
//         handleSubmit,
//         handleBlur,
//         touched,
//         setFieldValue,
//         values,
//         handleChange,
//         resetForm,
//         errors,
//       }) => (
//         <Box p="2rem 0" m="2rem auto" width={isNotMobile ? "50%" : "90%"}>
//           <Typography textAlign="center" mb="2rem">
//             Welcome to Taskup
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Box display="flex" flexDirection="column" gap="30px">
//               {isRegister && (
//                 <>
//                   <TextField
//                     label="Enter name"
//                     name="name"
//                     value={values.name}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={Boolean(touched.name) && Boolean(errors.name)}
//                     helperText={touched.name && errors.name}
//                   />
//                   <Dropzone
//                     multiple={false}
//                     acceptedFiles=".jpg , .png"
//                     onDrop={(acceptedFiles) => {
//                       setFieldValue("picture", acceptedFiles[0]);
//                     }}
//                   >
//                     {({ getRootProps, getInputProps }) => (
//                       <Box
//                         {...getRootProps()}
//                         p="1rem"
//                         border="2px solid #000"
//                         textAlign="center"
//                         sx={{
//                           "&:hover": {
//                             cursor: "pointer",
//                           },
//                         }}
//                       >
//                         <input {...getInputProps()} />
//                         {!values.picture ? (
//                           <Typography>Add picture</Typography>
//                         ) : (
//                           <Typography>
//                             {values.picture.name} <EditOutlinedIcon />
//                           </Typography>
//                         )}
//                       </Box>
//                     )}
//                   </Dropzone>
//                 </>
//               )}
//               <TextField
//                 label="Enter email"
//                 name="email"
//                 value={values.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={Boolean(touched.email) && Boolean(errors.email)}
//                 helperText={touched.email && errors.email}
//               />
//               <TextField
//                 label="Enter password"
//                 name="password"
//                 value={values.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={Boolean(touched.password) && Boolean(errors.password)}
//                 helperText={touched.password && errors.password}
//               />
//               <Button type="submit" m="2rem 0" background="#00d5fa">
//                 {isLogin ? "Login" : "Register"}
//               </Button>
//               <Typography
//                 onClick={() => {
//                   setPage(isLogin ? "register" : "login");
//                   resetForm();
//                 }}
//                 variant="h6"
//                 textAlign="center"
//                 sx={{
//                   "&:hover": {
//                     cursor: "pointer",
//                   },
//                 }}
//               >
//                 {isLogin ? (
//                   <>Not a user, go to register</>
//                 ) : (
//                   <>Already a user, go to login</>
//                 )}
//               </Typography>
//             </Box>
//           </form>
//         </Box>
//       )}
//     </Formik>
//   );
// };
// export default Login;

import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import axios from "../services/api.js";
import { setLogin } from "../redux/UserSlice";
import "../css/Login.css"; // Import your CSS file

const initialRegisterValues = {
  name: "",
  email: "",
  password: "",
  picture: null,
};

const initialLoginValues = {
  email: "",
  password: "",
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [page, setPage] = useState("login");
  const isLogin = page === "login";
  const isRegister = page === "register";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width:768px)");

  const handleLogin = (values, onSubmitProps) => {
    axios.post("/auth/login", values).then((res) => {
      onSubmitProps.resetForm();
      dispatch(setLogin(res.data.user));
      navigate("/home");
    });
  };

  const handleRegister = (values, onSubmitProps) => {
    let formData = new FormData();
    for (const property of Object.keys(values)) {
      formData.append(property, values[property]);
    }
    axios.post("/auth/register", formData).then((res) => {
      onSubmitProps.resetForm();
      setPage("login");
    });
  };

  const handleForm = (values, onSubmitProps) => {
    if (isLogin) handleLogin(values, onSubmitProps);
    if (isRegister) handleRegister(values, onSubmitProps);
  };

  return (
    <Formik
      initialValues={isLogin ? initialLoginValues : initialRegisterValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleForm}
    >
      {({
        handleSubmit,
        handleBlur,
        touched,
        setFieldValue,
        values,
        handleChange,
        resetForm,
        errors,
      }) => (
        <Box className="form-container">
          <Typography className="form-title" variant="h5">
            Welcome to Taskup
          </Typography>
          <form onSubmit={handleSubmit} className="form">
            {isRegister && (
              <>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Enter name
                  </label>
                  <TextField
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    className="form-input"
                  />
                  {touched.name && errors.name && (
                    <Typography className="form-error">
                      {errors.name}
                    </Typography>
                  )}
                </div>
                <div className="form-group">
                  <Dropzone
                    accept=".jpg,.png"
                    maxFiles={1}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="dropzone-box">
                        <input {...getInputProps()} />
                        {values.picture ? (
                          <div className="picture-preview">
                            <img
                              src={URL.createObjectURL(values.picture)}
                              alt="Uploaded"
                            />
                            <Typography>{values.picture.name}</Typography>
                          </div>
                        ) : (
                          <Typography>
                            Drop or click to upload a picture
                          </Typography>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </>
            )}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Enter email
              </label>
              <TextField
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                className="form-input"
              />
              {touched.email && errors.email && (
                <Typography className="form-error">{errors.email}</Typography>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Enter password
              </label>
              <TextField
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                className="form-input"
              />
              {touched.password && errors.password && (
                <Typography className="form-error">
                  {errors.password}
                </Typography>
              )}
            </div>
            <Button type="submit" className="button">
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPage(isLogin ? "register" : "login");
                resetForm();
              }}
              className="switch-page"
            >
              {isLogin
                ? "Not a user? Register here"
                : "Already a user? Login here"}
            </Typography>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default Login;
