import React, { useState } from 'react';
import TaskCard from './taskCard';

import TaskForm from './taskForm';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { updateTask } from '../redux/actions';

const TaskBoard = ({ status, title }) => {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state?.tasks?.tasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item, a) => {
      const findTask = tasks?.find((task) => task?.id === item?.id)
      if (findTask) {
        dispatch(updateTask({ ...findTask, status: status }));
      }
    }
  });
  const handleAddTask = () => {
    setEditTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setIsFormOpen(true);
  };

  return (
    <Box ref={drop} sx={{ width: '30%', padding: '10px', backgroundColor: '#e1dddb', borderRadius: '3px', height: 'fit-content' }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {tasks.filter((task) => task.status === status).map(task => (
        <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
      ))}
      <Typography style={{ color: "#a3a3a3", cursor: 'pointer' }} onClick={() => handleAddTask()}>Add a card...</Typography>

      {isFormOpen && (
        <TaskForm
          initialValues={editTask || { title: '', assignee: '', deadline: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), status: 'todo' }}
          onClose={() => setIsFormOpen(false)}
          open={isFormOpen}
          editMode={!!editTask}
        />
      )}
    </Box>
  );
};

export default TaskBoard;
