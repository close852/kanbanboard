let express = require('express');
let app = express();
let initBoard = require('../models/data')
//list
app.get('/', (req, res) => [
    res.redirect('/task/list')
])
app.get('/list', async (req, res) => {
    res.render('index', {
        title: 'My Kanban Board',
        todoTasks: await initBoard.todo,
        inProgressTasks: await initBoard.inProgress,
        doneTasks: await initBoard.done
    })
})
app.post('/add', (req, res) => {
    let { contents } = req.body;
    if (!contents) {
        return;
    }
    if (!initBoard.todo.find(e => e === contents)) {
        (initBoard.todo.push(contents))
    }
    res.redirect('/task')
})

app.put('/updateAjax/:status', async (req, res) => {
    let { status } = req.params;
    let { data } = req.body;

    res.send({ result: true, done: await initBoard.done, inProgress: await initBoard.inProgress, todo: await initBoard.todo });
})

app.delete('/remove', (req, res) => {

    let { contents } = req.body;
    if (isContain(initBoard.done, contents)) {
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