// import { Box, Select, MenuItem, InputLable } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { setLogout } from "../redux/UserSlice";

// const Header = () => {
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   return (
//     <Box
//       height="50px"
//       backgroundColor="#03c6fc"
//       padding="0 20px"
//       display="flex"
//       alignItems="center"
//       justifyContent="space-between"
//     >
//       <Box fontSize="20px" color="#fff" fontWeight="bold">
//         <Link to="/home" style={{ textDecoration: "none" }}>
//           Task up
//         </Link>
//       </Box>
//       <Box display="flex" alignItems="center" gap="10px">
//         <img
//           src={`http://localhost:5000/assets/${user.picturePath}`}
//           width="35px"
//           height="35px"
//           style={{ borderRadius: "50%", objectFit: "cover" }}
//           alt={user.name}
//         />
//         <Select
//           sx={{
//             boxShadow: "none",
//             ".MuiOutlinedInput-notchedOutline": { border: 0 },
//           }}
//           value={user.name}
//         >
//           <MenuItem value={user.name}>{user.name}</MenuItem>
//           <MenuItem
//             onClick={() => {
//               dispatch(setLogout());
//               navigate("/");
//             }}
//           >
//             Logout
//           </MenuItem>
//         </Select>
//       </Box>
//     </Box>
//   );
// };
// export default Header;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/UserSlice";
import "../css/Header.css"; // Import your CSS file

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="header-container">
      <div className="header-logo">
        <Link to="/home">Task up</Link>
      </div>
      <div className="header-user">
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
