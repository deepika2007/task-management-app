import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../redux/actions';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const TaskCard = ({ task, onEdit }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id, status: task.status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => {}
    });
    drag(drop(ref));
    return (
        <Card ref={ref}
            style={{ opacity: isDragging ? 0.5 : 1, marginBottom: '10px' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 10px', alignItems: "center" }}>
                <Typography variant="p">{task.title}</Typography>
                {hovered && <EditIcon color='#ababab' fontSize='10' style={{ cursor: 'pointer' }} onClick={() => onEdit(task)} />}
            </CardContent>
        </Card>
    );
};

export default TaskCard;
