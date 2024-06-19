import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/api";
import "../css/Subtasks.css";

const Collaborators = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await axios.get(`/task/${taskId}/collaborators`);
        if (response.data && Array.isArray(response.data.collaborators)) {
          setCollaborators(response.data.collaborators);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchCollaborators();
  }, [taskId]);

  const handleDeleteCollaborator = async (userId) => {
    try {
      const response = await axios.delete(
        `/task/${taskId}/collaborator/${userId}`
      );
      if (response.data && response.data.task && response.data.task.collaborators) {
        setCollaborators(response.data.task.collaborators);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error deleting collaborator:", error);
    }
  };

  return (
    <div className="subtasks-container">
      <div className="subtasks-header">
        <button className="back-button" onClick={() => navigate("/home")}>
          &#8592; Back to Home
        </button>
        <h2>Collaborators</h2>
      </div>
      <div className="subtask-list">
        {collaborators && collaborators.length > 0 ? (
          collaborators.map((collaborator) => (
            <div key={collaborator.userId} className="subtask-item">
              <span>{collaborator.email || "Unknown email"}</span>
              <button
                className="delete-button"
                onClick={() => handleDeleteCollaborator(collaborator.userId)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No collaborators available.</p>
        )}
      </div>
    </div>
  );
};

export default Collaborators;
