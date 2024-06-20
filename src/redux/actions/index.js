import axios from 'axios';
import '../../config/api';

// fetch all tasks 
export const fetchTasks = () => async dispatch => {
  const response = await axios.get('/api/tasks');
  dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: response.data });
};

// add new task
export const addTask = task => async dispatch => {
  const response = await axios.post('/api/tasks', task);
  dispatch({ type: 'ADD_TASK_SUCCESS', payload: response.data });
};

// update task
export const updateTask = task => async dispatch => {
  const response = await axios.put(`/api/tasks/${task.id}`, task);
  dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data });
};
