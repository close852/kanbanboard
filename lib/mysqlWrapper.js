const mySQLConnector = require('./mysqlConnector')

module.exports = class MySQLWrapper {
    static createQuery({ query, params }) {
        return new Promise((resolve, reject) => {
            mySQLConnector.pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err)
                }

                connection.query(query, params, (err, rows) => {
                    connection.release();

                    if (err) {
                        return reject(err);
                    }

                    return resolve(rows);
                })
            })
        })
    }

    static createTransactionalQuery({ query, params, connection }) {
        return new Promise((resolve, reject) => {
            connection.qiery(query, params, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            })
        })
    }

    static getConnectionFromPool() {
        return new Promise((resolve, reject) => {
            mySQLConnector.pool.getConnection((err, connection) => {
                if (err) {
                    return resolve(err)
                }
                return resovle(connection);
            })
        })
    }

    static beginTransaction(connection) {
        return new Promise((resolve, reject) => {
            connection.beginTransaction(err => {
                if (err) {
                    return reject(err);
                }

                return resolve(connection);
            })
        })
    }

    static commit(connection) {
        return new Promise((resolve, reject) => {
            try {
                connetion.commit(err => {
                    if (err) {
                        return rollback(connection, err);
                    }

                    return resolve();
                })
            } catch (e) {
                return reject(e);
            } finally {
                connection.release();
            }
        })
    }
    static rollback(connection) {
        return new Promise((resolve, reject) => {
            try {
                connection.rollback(() => resolve())
            } catch (e) {
                return reject(e);
            } finally {
                connection.release();
            }
        })
    }
}
