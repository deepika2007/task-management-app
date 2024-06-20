import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/actions';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/material';
ChartJS.register(ArcElement, Tooltip, Legend);

const Stats = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (!tasks) {
    return <div>Loading...</div>;
  }

  // Calculate data for Pie chart
  const pieData = {
    labels: ['To Do', 'Running', 'Completed'],
    datasets: [
      {
        data: [
          tasks.filter(task => task.status === 'todo')?.length,
          tasks.filter(task => task.status === 'running')?.length,
          tasks.filter(task => task.status === 'completed')?.length,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Box sx={{ width:'400px', height: '350px', margin: 'auto' }}>
    <Pie data={pieData} />
  </Box>;
};

export default Stats;
