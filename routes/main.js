var initialTasks = require('../models/initial-tasks');
const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Kanban Board',
        todoTasks: initialTasks.getTasks().todo,
        inProgressTasks: initialTasks.getTasks().inProgress,
        doneTasks: initialTasks.getTasks().done
    })
})

module.exports = app;