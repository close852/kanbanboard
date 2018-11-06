let board = require('./board/board')

module.exports = {
    todo: board.findBoardByStatus('todo'),
    inProgress: board.findBoardByStatus('inProgress'),
    done: board.findBoardByStatus('done')
}