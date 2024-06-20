import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

// Initialize tasks data
let tasks = [];

// mock api for add task 
mock.onPost('/api/tasks').reply(config => {
    const newTask = JSON.parse(config.data);
    newTask.id = Date.now();
    tasks.push(newTask);
    return [200, newTask];
});

// mock api for update task
mock.onPut(new RegExp('/api/tasks/*')).reply(config => {
    const updatedTask = JSON.parse(config.data);
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    tasks[index] = updatedTask;
    return [200, updatedTask];
});

// mock api for get task
mock.onGet('/api/tasks').reply(200, tasks);
