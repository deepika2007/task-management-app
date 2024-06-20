import React from 'react';
import TaskBoard from './taskBoard';
import { Box } from '@mui/material';

const Dashboard = () => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '20px', height:'100vh', background: "#1f5f9c" }}>
            <TaskBoard title='To Do' status="todo" />
            <TaskBoard title='Doing' status="running" />
            <TaskBoard title='Done' status="completed" />
        </Box>
    );
};

export default Dashboard;
