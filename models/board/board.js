const DAO = require('../../lib/dao');
const mySQLWrapper = require('../../lib/mysqlWrapper');

class Board extends DAO {
    static get TABLE_NAME() {
        return 't_board';
    }
    static get STATUS() {
        return "status";
    }

    static async findAllBoards() {
        return await this.findAll();
    }

    static async findBoardByStatus(status) {
        return await this.findByStatus(status);
    }
    static async updateBoardStatusById(boardid, status) {
        return await this.updateStatusById(boardid, status);
    }
}
module.exports = Board;