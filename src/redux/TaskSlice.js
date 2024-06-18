// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   tasks: [],
//   task: {},
// };

// const taskSlice = createSlice({
//   name: "taskslice",
//   initialState,
//   reducers: {
//     setTasks: (state, action) => {
//       state.tasks = [...action.payload];
//     },
//     setTask: (state, action) => {
//       state.task = action.payload;
//     },
//     deleteTask: (state, action) => {
//       const taskId = action.payload;
//       state.tasks = state.tasks.filter((task) => task._id !== taskId);
//     },
//   },
// });

// export const { setTasks, setTask, deleteTask } = taskSlice.actions;

// export default taskSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  task: {},
};

const taskSlice = createSlice({
  name: "taskslice",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = [...action.payload];
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== taskId);
    },
    setSubtasks: (state, action) => {
      const { taskId, subtasks } = action.payload;
      const task = state.tasks.find((task) => task._id === taskId);
      if (task) {
        task.subtasks = subtasks;
      }
    },
    addSubtask: (state, action) => {
      const { taskId, subtask } = action.payload;
      const task = state.tasks.find((task) => task._id === taskId);
      if (task) {
        task.subtasks.push(subtask);
      }
    },
    updateSubtask: (state, action) => {
      const { taskId, subtask } = action.payload;
      const task = state.tasks.find((task) => task._id === taskId);
      if (task) {
        task.subtasks = task.subtasks.map((st) =>
          st._id === subtask._id ? subtask : st
        );
      }
    },
    deleteSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks.find((task) => task._id === taskId);
      if (task) {
        task.subtasks = task.subtasks.filter((st) => st._id !== subtaskId);
      }
    },
  },
});

export const {
  setTasks,
  setTask,
  deleteTask,
  setSubtasks,
  addSubtask,
  updateSubtask,
  deleteSubtask,
} = taskSlice.actions;

export default taskSlice.reducer;
