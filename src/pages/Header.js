// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { setLogout } from "../redux/UserSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
// import "../css/Header.css"; // Import your CSS file

// const Header = () => {
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [isOpen, setIsOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     if (isDarkMode) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   }, [isDarkMode]);

//   const handleLogout = () => {
//     dispatch(setLogout());
//     navigate("/");
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeDropdown = () => {
//     setIsOpen(false);
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div className="header-container">
//       <div className="header-logo">
//         <Link to="/home">Task up</Link>
//       </div>
//       <div className="header-user">
//         <button className="dark-mode-toggle" onClick={toggleDarkMode}>
//           <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
//         </button>
//         <div className="header-avatar" onClick={toggleDropdown}>
//           <img
//             src={`http://localhost:5000/assets/${user.picturePath}`}
//             alt={user.name}
//           />
//           <span className="header-username">{user.name}</span>
//         </div>
//         {isOpen && (
//           <div className="header-dropdown" onMouseLeave={closeDropdown}>
//             <div className="header-dropdown-content">
//               <div className="header-dropdown-item" onClick={handleLogout}>
//                 Logout
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/UserSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "../css/Header.css"; // Import your CSS file

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Persist dark mode state in localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    setIsDarkMode(storedDarkMode === "true");
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", isDarkMode); // Persist state
  }, [isDarkMode]);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="header-container">
      <div className="header-logo">
        <Link to="/home">CoTaskify</Link>
      </div>
      <div className="header-user">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
        <div className="header-avatar" onClick={toggleDropdown}>
          <img
            src={`http://localhost:5000/assets/${user.picturePath}`}
            alt={user.name}
          />
          <span className="header-username">{user.name}</span>
        </div>
        {isOpen && (
          <div className="header-dropdown" onMouseLeave={closeDropdown}>
            <div className="header-dropdown-content">
              <div className="header-dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
