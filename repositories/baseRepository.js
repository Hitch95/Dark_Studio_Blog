import db from '../src/utils/connectDB';
import { verifyUser } from "./userRepository";

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

async function getUser(userId) {

    const connection = await classicConnection();
    const result = await connection.query(`
        SELECT u.id, username, email, password, image_src,
        CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END AS is_admin
        FROM users u
        JOIN roles_id r ON u.id = r.user_id
        JOIN roles ro ON r.role_id = ro.id
        WHERE u.id = ? AND ro.name = 'ADMIN';
    `
        , [userId]);
    connection.end();
    return result
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
    getUser
};