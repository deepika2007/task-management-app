import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../redux/actions';
import { TextField, Button, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const TaskSchema = Yup.object().shape({
    title: Yup.string().max(15, 'Title must be 15 characters or less.').matches(/^[\w \-_/]+$/, 'Only alphanumeric characters, hyphen, underscore, and slash are allowed').required('Title is required'),
    assignee: Yup.string().max(20, 'Assignee must be 20 characters or less.').matches(/^[a-zA-Z\s]+$/, 'Only letters and spaces are allowed').required('Assignee is required'),
    deadline: Yup.date().min(new Date(), 'No past dates allowed').default(() => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)),
    status: Yup.string().oneOf(['todo', 'running', 'completed']).required('Status is required'),
});
const TaskForm = ({ initialValues, editMode, onClose, open }) => {
    const dispatch = useDispatch();

    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>{editMode ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <Formik
            initialValues={initialValues}
            validationSchema={TaskSchema}
            onSubmit={(values, { setSubmitting }) => {
                if (editMode) {
                    dispatch(updateTask(values));
                } else {
                    dispatch(addTask(values));
                }
                setSubmitting(false);
                onClose();
            }}
        >
            {({ values, isSubmitting, errors, touched }) => {
                const date = new Date(values.deadline);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                return <Form>
                    <DialogContent>
                        <Field
                            size='small'
                            as={TextField}
                            name="title"
                            label="Task Title"
                            fullWidth
                            error={touched.title && !!errors.title}
                            helperText={touched.title && errors.title}
                            margin="normal"
                        />
                        <Field
                            size='small'
                            as={TextField}
                            name="assignee"
                            label="Assignee"
                            fullWidth
                            error={touched.assignee && !!errors.assignee}
                            helperText={touched.assignee && errors.assignee}
                            margin="normal"
                        />
                        <Field
                            size='small'
                            as={TextField}
                            name="deadline"
                            label="Deadline"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={formattedDate}
                            error={touched.deadline && !!errors.deadline}
                            helperText={touched.deadline && errors.deadline}
                            margin="normal"
                            minDate={new Date()}
                            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)}
                        />
                        <Field
                            size='small'
                            as={TextField}
                            name="status"
                            label="Status"
                            select
                            fullWidth
                            error={touched.status && !!errors.status}
                            helperText={touched.status && errors.status}
                            margin="normal"
                        >
                            <MenuItem value="todo">To Do</MenuItem>
                            <MenuItem value="running">Running</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </Field>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">Cancel</Button>
                        <Button type="submit" color="primary" disabled={isSubmitting}>
                            {editMode ? 'Edit Task' : 'Add Task'}
                        </Button>
                    </DialogActions>
                </Form>
            }}
        </Formik>
    </Dialog>
};

export default TaskForm;
