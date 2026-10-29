import pool from "./pool.js";

async function getKeyboards() {
    const {rows} = await pool.query("SELECT * FROM keyboards");
    return rows;
}

async function addKeyboard(keyboard) {
    await pool.query(
        "INSERT INTO keyboards (name, stock, brand, size, switch_type, connection_type) VALUES ($1, $2, $3, $4, $5, $6)", 
        [keyboard.name, keyboard.stock, keyboard.brand, keyboard.size, keyboard.switchType, keyboard.connectionType]
    );
}

async function deleteKeyboard(id) {
    await pool.query("DELETE FROM keyboards WHERE id = $1", [id]);
}

async function getKeyboard(id) {
    const {rows} = await pool.query("SELECT * FROM keyboards WHERE id = $1", [id]);
    return rows[0];
}

async function updateKeyboard(id, newInfo) {
    await pool.query("UPDATE keyboards SET name=$1, stock=$2, brand=$3, size=$4, switch_type=$5, connection_type=$6", newInfo);
}

export {
    getKeyboards,
    addKeyboard,
    deleteKeyboard,
    getKeyboard,
    updateKeyboard
}