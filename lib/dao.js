const mysql = require('./mysqlWrapper');

class DAO {
    static get PRIMARY_KEY() {
        return "id"
    }

    static findAll() {
        return mysql.createQuery({
            query: `SELECT * FROM ??;`,
            params: [this.TABLE_NAME]
        });
    }

    static findByStatus(status) {
        return mysql.createQuery({
            query: `SELECT * FROM ?? where ?? = ?;`,
            params: [this.TABLE_NAME, this.STATUS, status]
        });
    }
    static updateStatusById(boardid,status) {
        return mysql.createQuery({
            query: `update ?? set ?? = ?;`,
            params: [this.TABLE_NAME,this.STATUS]
        });
    }

}

module.exports = DAO;