let express = require('express');
let app = express();
let initialTasks = require('../models/initial-tasks')
//list
app.get('/', (req, res) => [
    res.redirect('/task/list')
])
app.get('/list', (req, res) => {
    res.render('index', {
        title: 'My Kanban Board',
        todoTasks: initialTasks.todo,
        inProgressTasks: initialTasks.inProgress,
        doneTasks: initialTasks.done
    })
})
app.post('/add', (req, res) => {
    let { contents } = req.body;
    if (!contents) {
        return;
    }
    if (!initialTasks.todo.find(e => e === contents)) {
        (initialTasks.todo.push(contents))
    }
    res.redirect('/task')
})

app.post('/update/:status', (req, res) => {
    let { status } = req.params;
    let { contents } = req.body;
    if (status === 'done') {
        if (isContain(initialTasks.inProgress, contents)) {
            initialTasks.done.push(contents);
        }
    } else if (status === 'progress') {
        if (isContain(initialTasks.todo, contents)) {
            initialTasks.inProgress.push(contents);
        } else if (isContain(initialTasks.done, contents)) {
            initialTasks.inProgress.push(contents);
        }
    } else if (status === 'todo') {
        if (isContain(initialTasks.inProgress, contents)) {
            initialTasks.todo.push(contents);
        }

    }
    res.redirect('/task')
})

app.post('/updateAjax/:status', (req, res) => {
    let { status } = req.params;
    let { data } = req.body;

    removeData(initialTasks, data);

    let isc = false;
    if (status === 'done') {
        initialTasks.done.push(data);
        isc = true;
    } else if (status === 'inProgress') {
        initialTasks.inProgress.push(data);
        isc = true;
    } else if (status === 'todo') {
        initialTasks.todo.push(data);
        isc = true;
    }
    res.send({ result: true, msg: 'gogo' });
})

app.post('/remove', (req, res) => {

    let { contents } = req.body;
    if (isContain(initialTasks.done, contents)) {
        res.redirect('/task')
    } else {
        res.redirect('/task')
    }

})

let removeData = (arr, contents) => {
    let keys = Object.keys(arr);
    for (v in keys) {
        isContain(arr[keys[v]], contents);
    }
}
let isContain = (arr, contents) => {
    let isc = false;
    if (arr.find(e => e === contents)) {
        arr.forEach((v, i, arr) => {
            if (v === contents) {
                arr.splice(i, 1);
                isc = true;
            }
        })
    }
    return isc;
}

module.exports = app;