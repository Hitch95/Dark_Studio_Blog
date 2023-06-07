import { db } from "@/utils/connectDB";

async function find(sql, args = [], onlyOne = false) {
    const connection = await db.classicConnection();
    const [rows] = await connection.execute(sql, args);
    connection.end();

    return onlyOne ? (rows.length > 0 ? rows[0] : null) : rows;
}

async function findOne(sql, args = []) {
    return await find(sql, args, true);
}

async function findAll(table) {
    return await find(`SELECT * FROM ${table}`);
}

async function insert(table, fields, values) {
    const connection = await db.classicConnection();
    const valuesMarkers = values.map(() => "?").join(",");
    const insertQuery = `INSERT INTO ${table} (${fields.join(",")}) VALUES (${valuesMarkers})`;

    const [result] = await connection.execute(insertQuery, values);
    connection.end();

    return result.insertId;
}

async function update(table, id, entries) {
    const connection = await db.classicConnection();
    let sql = `UPDATE ${table} SET `;
    const updateValues = Object.values(entries);
    const updateFields = Object.keys(entries);

    sql += updateFields.map((field) => `${field}=?`).join(",");
    sql += " WHERE id = ?";

    await connection.execute(sql, [...updateValues, id]);
    connection.end();

    return entries;
}

async function updateWhere(table, where, whereValue, entries) {
    const connection = await db.classicConnection();
    let sql = `UPDATE ${table} SET `;
    const updateValues = Object.values(entries);
    const updateFields = Object.keys(entries);

    sql += updateFields.map((field) => `${field}=?`).join(",");
    sql += ` WHERE ${where} = ?`;

    await connection.execute(sql, [...updateValues, whereValue]);
    connection.end();
}

async function remove(table, id) {
    const connection = await db.classicConnection();
    await connection.execute(`DELETE FROM ${table} WHERE id = ?`, [id]);
    connection.end();
}

async function removeWhere(table, where, whereValue) {
    const connection = await db.classicConnection();
    await connection.execute(`DELETE FROM ${table} WHERE ${where} = ?`, [whereValue]);
    connection.end();
}

export const baseRepository = {
    find,
    findOne,
    findAll,
    insert,
    update,
    updateWhere,
    remove,
    removeWhere,
};
