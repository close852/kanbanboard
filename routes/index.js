const main = require('./main')
const taskController = require('./task-controller')
// 라우터 붙이기
module.exports = class Routes {
    constructor(app) {
        if (!app) throw new Error("You must provide an instance of express")

        // app.use('/', main);
        app.use('/task', taskController);
    }
}