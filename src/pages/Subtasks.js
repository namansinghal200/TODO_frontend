// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../services/api";
// import "../css/Subtasks.css";

// const Subtasks = () => {
//   const { taskId } = useParams();
//   const navigate = useNavigate();
//   const [subtasks, setSubtasks] = useState([]);
//   const [newSubtask, setNewSubtask] = useState("");
//   const [newSubtaskPriority, setNewSubtaskPriority] = useState("Low");
//   const [editingSubtaskId, setEditingSubtaskId] = useState(null);
//   const [editSubtaskName, setEditSubtaskName] = useState("");
//   const [editSubtaskPriority, setEditSubtaskPriority] = useState("");

//   useEffect(() => {
//     const fetchSubtasks = async () => {
//       try {
//         const response = await axios.get(`/task/${taskId}/subtask`);
//         if (response.data && Array.isArray(response.data.subtasks)) {
//           setSubtasks(response.data.subtasks);
//         } else {
//           console.error("Unexpected response structure:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching subtasks:", error);
//       }
//     };

//     fetchSubtasks();
//   }, [taskId]);

//   const handleAddSubtask = async () => {
//     try {
//       const response = await axios.post(`/task/${taskId}/subtask`, {
//         name: newSubtask,
//         completed: false,
//         priority: newSubtaskPriority,
//       });
//       if (response.data && response.data.task && response.data.task.subtasks) {
//         setSubtasks(response.data.task.subtasks);
//         setNewSubtask("");
//         setNewSubtaskPriority("Low");
//       } else {
//         console.error("Unexpected response structure:", response.data);
//       }
//     } catch (error) {
//       console.error("Error adding subtask:", error);
//     }
//   };

//   const handleUpdateSubtask = async (subtaskId, updatedSubtask) => {
//     try {
//       const response = await axios.put(
//         `/task/${taskId}/subtask/${subtaskId}`,
//         updatedSubtask
//       );
//       if (response.data && response.data.task && response.data.task.subtasks) {
//         setSubtasks(response.data.task.subtasks);
//       } else {
//         console.error("Unexpected response structure:", response.data);
//       }
//     } catch (error) {
//       console.error("Error updating subtask:", error);
//     }
//   };

//   const handleDeleteSubtask = async (subtaskId) => {
//     try {
//       const response = await axios.delete(
//         `/task/${taskId}/subtask/${subtaskId}`
//       );
//       if (response.data && response.data.task && response.data.task.subtasks) {
//         setSubtasks(response.data.task.subtasks);
//       } else {
//         console.error("Unexpected response structure:", response.data);
//       }
//     } catch (error) {
//       console.error("Error deleting subtask:", error);
//     }
//   };

//   const handleEditStart = (subtaskId, currentName, currentPriority) => {
//     setEditingSubtaskId(subtaskId);
//     setEditSubtaskName(currentName);
//     setEditSubtaskPriority(currentPriority);
//   };

//   const handleEditCancel = () => {
//     setEditingSubtaskId(null);
//     setEditSubtaskName("");
//     setEditSubtaskPriority("");
//   };

//   const handleEditConfirm = async (subtaskId) => {
//     if (editSubtaskName.trim() === "") {
//       alert("Subtask name cannot be empty");
//       return;
//     }

//     try {
//       await handleUpdateSubtask(subtaskId, {
//         ...subtasks.find((subtask) => subtask._id === subtaskId),
//         name: editSubtaskName,
//         priority: editSubtaskPriority,
//       });
//       setEditingSubtaskId(null);
//       setEditSubtaskName("");
//       setEditSubtaskPriority("");
//     } catch (error) {
//       console.error("Error updating subtask:", error);
//     }
//   };

//   return (
//     <div className="subtasks-container">
//       <div className="subtasks-header">
//         <button className="back-button" onClick={() => navigate("/home")}>
//           &#8592; Back to Home
//         </button>
//         <h2>Subtasks</h2>
//       </div>
//       <div className="subtask-list">
//         {subtasks && subtasks.length > 0 ? (
//           subtasks.map((subtask) => (
//             <div key={subtask._id} className="subtask-item">
//               <input
//                 type="checkbox"
//                 checked={subtask.completed || false}
//                 onChange={() =>
//                   handleUpdateSubtask(subtask._id, {
//                     ...subtask,
//                     completed: !subtask.completed,
//                   })
//                 }
//               />
//               {editingSubtaskId === subtask._id ? (
//                 <div>
//                   <input
//                     type="text"
//                     className="edit-input"
//                     value={editSubtaskName}
//                     onChange={(e) => setEditSubtaskName(e.target.value)}
//                     onBlur={() => handleEditConfirm(subtask._id)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") handleEditConfirm(subtask._id);
//                       else if (e.key === "Escape") handleEditCancel();
//                     }}
//                     autoFocus
//                   />
//                   <select
//                     className="priority-dropdown"
//                     value={editSubtaskPriority}
//                     onChange={(e) => setEditSubtaskPriority(e.target.value)}
//                   >
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                 </div>
//               ) : (
//                 <div>
//                   <span
//                     className={subtask.completed ? "completed" : ""}
//                     onClick={() =>
//                       handleEditStart(
//                         subtask._id,
//                         subtask.name,
//                         subtask.priority
//                       )
//                     }
//                   >
//                     {subtask.name || "Unnamed subtask"}
//                   </span>
//                   <span
//                     className="priority-display"
//                     onClick={() =>
//                       handleEditStart(
//                         subtask._id,
//                         subtask.name,
//                         subtask.priority
//                       )
//                     }
//                   >
//                     {subtask.priority}
//                   </span>
//                 </div>
//               )}
//               {editingSubtaskId !== subtask._id && (
//                 <select
//                   className="priority-dropdown"
//                   value={subtask.priority}
//                   onChange={(e) =>
//                     handleUpdateSubtask(subtask._id, {
//                       ...subtask,
//                       priority: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//               )}
//               <button
//                 className="delete-button"
//                 onClick={() => handleDeleteSubtask(subtask._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No subtasks available.</p>
//         )}
//       </div>
//       <div className="add-subtask">
//         <input
//           type="text"
//           value={newSubtask}
//           onChange={(e) => setNewSubtask(e.target.value)}
//           placeholder="Add new subtask"
//         />
//         <div className="radio-buttons">
//           <label>
//             <input
//               type="radio"
//               value="High"
//               checked={newSubtaskPriority === "High"}
//               onChange={() => setNewSubtaskPriority("High")}
//             />
//             High
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="Medium"
//               checked={newSubtaskPriority === "Medium"}
//               onChange={() => setNewSubtaskPriority("Medium")}
//             />
//             Medium
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="Low"
//               checked={newSubtaskPriority === "Low"}
//               onChange={() => setNewSubtaskPriority("Low")}
//             />
//             Low
//           </label>
//         </div>
//         <button className="add-button" onClick={handleAddSubtask}>
//           Add Subtask
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Subtasks;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/api";
import "../css/Subtasks.css";

const Subtasks = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [newSubtaskPriority, setNewSubtaskPriority] = useState("Low");
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editSubtaskName, setEditSubtaskName] = useState("");
  const [editSubtaskPriority, setEditSubtaskPriority] = useState("");

  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const response = await axios.get(`/task/${taskId}/subtask`);
        if (response.data && Array.isArray(response.data.subtasks)) {
          // Sort subtasks by priority: High -> Medium -> Low
          const sortedSubtasks = response.data.subtasks.sort((a, b) => {
            const priorityOrder = { High: 3, Medium: 2, Low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          });
          setSubtasks(sortedSubtasks);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching subtasks:", error);
      }
    };

    fetchSubtasks();
  }, [taskId]);

  const handleAddSubtask = async () => {
    try {
      const response = await axios.post(`/task/${taskId}/subtask`, {
        name: newSubtask,
        completed: false,
        priority: newSubtaskPriority,
      });
      if (response.data && response.data.task && response.data.task.subtasks) {
        // Sort subtasks after adding new subtask
        const sortedSubtasks = response.data.task.subtasks.sort((a, b) => {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        setSubtasks(sortedSubtasks);
        setNewSubtask("");
        setNewSubtaskPriority("Low");
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error adding subtask:", error);
    }
  };

  const handleUpdateSubtask = async (subtaskId, updatedSubtask) => {
    try {
      const response = await axios.put(
        `/task/${taskId}/subtask/${subtaskId}`,
        updatedSubtask
      );
      if (response.data && response.data.task && response.data.task.subtasks) {
        // Sort subtasks after updating subtask
        const sortedSubtasks = response.data.task.subtasks.sort((a, b) => {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        setSubtasks(sortedSubtasks);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  };

  const handleDeleteSubtask = async (subtaskId) => {
    try {
      const response = await axios.delete(
        `/task/${taskId}/subtask/${subtaskId}`
      );
      if (response.data && response.data.task && response.data.task.subtasks) {
        // Sort subtasks after deleting subtask
        const sortedSubtasks = response.data.task.subtasks.sort((a, b) => {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        setSubtasks(sortedSubtasks);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  };

  const handleEditStart = (subtaskId, currentName, currentPriority) => {
    setEditingSubtaskId(subtaskId);
    setEditSubtaskName(currentName);
    setEditSubtaskPriority(currentPriority);
  };

  const handleEditCancel = () => {
    setEditingSubtaskId(null);
    setEditSubtaskName("");
    setEditSubtaskPriority("");
  };

  const handleEditConfirm = async (subtaskId) => {
    if (editSubtaskName.trim() === "") {
      alert("Subtask name cannot be empty");
      return;
    }

    try {
      await handleUpdateSubtask(subtaskId, {
        ...subtasks.find((subtask) => subtask._id === subtaskId),
        name: editSubtaskName,
        priority: editSubtaskPriority,
      });
      setEditingSubtaskId(null);
      setEditSubtaskName("");
      setEditSubtaskPriority("");
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  };

  return (
    <div className="subtasks-container">
      <div className="subtasks-header">
        <button className="back-button" onClick={() => navigate("/home")}>
          &#8592; Back to Home
        </button>
        <h2>Subtasks</h2>
      </div>
      <div className="subtask-list">
        {subtasks && subtasks.length > 0 ? (
          subtasks.map((subtask) => (
            <div
              key={subtask._id}
              className={`subtask-item ${
                subtask.priority === "High"
                  ? "high-priority"
                  : subtask.priority === "Medium"
                  ? "medium-priority"
                  : "low-priority"
              }`}
            >
              <input
                type="checkbox"
                checked={subtask.completed || false}
                onChange={() =>
                  handleUpdateSubtask(subtask._id, {
                    ...subtask,
                    completed: !subtask.completed,
                  })
                }
              />
              {editingSubtaskId === subtask._id ? (
                <div>
                  <input
                    type="text"
                    className="edit-input"
                    value={editSubtaskName}
                    onChange={(e) => setEditSubtaskName(e.target.value)}
                    onBlur={() => handleEditConfirm(subtask._id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEditConfirm(subtask._id);
                      else if (e.key === "Escape") handleEditCancel();
                    }}
                    autoFocus
                  />
                  <select
                    className={`priority-dropdown ${
                      subtask.priority === "High"
                        ? "high-priority"
                        : subtask.priority === "Medium"
                        ? "medium-priority"
                        : "low-priority"
                    }`}
                    value={editSubtaskPriority}
                    onChange={(e) => setEditSubtaskPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              ) : (
                <div>
                  <span
                    className={subtask.completed ? "completed" : ""}
                    onClick={() =>
                      handleEditStart(
                        subtask._id,
                        subtask.name,
                        subtask.priority
                      )
                    }
                  >
                    {subtask.name || "Unnamed subtask"}
                  </span>
                  {/* <span
                    className={`priority-display ${
                      subtask.priority === "High"
                        ? "high-priority"
                        : subtask.priority === "Medium"
                        ? "medium-priority"
                        : "low-priority"
                    }`}
                    onClick={() =>
                      handleEditStart(
                        subtask._id,
                        subtask.name,
                        subtask.priority
                      )
                    }
                  >
                    {subtask.priority}
                  </span> */}
                </div>
              )}
              <div>
                {editingSubtaskId !== subtask._id && (
                  <select
                    className={`priority-dropdown ${
                      subtask.priority === "High"
                        ? "high-priority"
                        : subtask.priority === "Medium"
                        ? "medium-priority"
                        : "low-priority"
                    }`}
                    value={subtask.priority}
                    onChange={(e) =>
                      handleUpdateSubtask(subtask._id, {
                        ...subtask,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteSubtask(subtask._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No subtasks available.</p>
        )}
      </div>
      <div className="add-subtask">
        <input
          type="text"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          placeholder="Add new subtask"
        />
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              value="High"
              checked={newSubtaskPriority === "High"}
              onChange={() => setNewSubtaskPriority("High")}
            />
            High
          </label>
          <label>
            <input
              type="radio"
              value="Medium"
              checked={newSubtaskPriority === "Medium"}
              onChange={() => setNewSubtaskPriority("Medium")}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              value="Low"
              checked={newSubtaskPriority === "Low"}
              onChange={() => setNewSubtaskPriority("Low")}
            />
            Low
          </label>
        </div>
        <button className="add-button" onClick={handleAddSubtask}>
          Add Subtask
        </button>
      </div>
    </div>
  );
};
export default Subtasks;
