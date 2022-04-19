const pgp = require("pg-promise")({
    capSQL: true
});

const schema = "public"

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'todo_list',
    user: 'postgres',
    password: "123456"
}

const db = pgp(cn)

exports.getAll = async (tableName) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const qStr = pgp.as.format("SELECT * FROM $1", table);
    console.log(qStr)
    try {
        const result = await db.any(qStr);
        return result
    } catch (error) {
        console.log("error in db/getAll: ", error)
    }
}

exports.getByValue = async (tableName, col, value) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const qStr = pgp.as.format("SELECT * FROM ${table} WHERE ${col~}=${value}", { table, col, value });
    try {
        const result = await db.any(qStr);
        return result
    } catch (error) {
        console.log("error in db/getByValue: ", error)
    }
}

exports.add = async (tableName, data) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const qStr = pgp.helpers.insert(data, Object.keys(data), table) + " RETURNING *";
    console.log(qStr)
    try {
        const result = await db.any(qStr);
        return result
    } catch (error) {
        console.log("error in db/add: ", error)
    }
}

exports.update = async (tableName, data, col, value) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema });
    const update = pgp.helpers.update(data, Object.keys(data), table);
    const condition = pgp.as.format(" WHERE ${col~}=${value}", { col, value }) + " RETURNING *";
    const qStr = update + condition;
    console.log(qStr)
    try {
        const result = await db.any(qStr);
        return result
    } catch (error) {
        console.log("error in db/update: ", error)
    }
}