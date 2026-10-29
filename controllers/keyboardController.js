import * as db from "../db/queries.js";


async function getKeyboards(req, res) {
    const keyboards = await db.getKeyboards();
    res.render("keyboards", {keyboards: keyboards});
}

function addKeyboardGet(req, res) {
    res.render("add");
}

async function addKeyboardPost(req, res) {
    const {name, stock, brand, size, switchType, connectionType} = req.body;
    await db.addKeyboard({name, stock, brand, size, switchType, connectionType});
    res.redirect("/keyboards");
}

async function deleteKeyboard(req, res) {
    const {id} = req.params;
    await db.deleteKeyboard(id);
    res.redirect("/keyboards");
}

async function getKeyboard(req, res) {
    const {id} = req.params;
    const keyboard = await db.getKeyboard(id);
    res.render("keyboard", {keyboard: keyboard});
}

function updateKeyboardGet(req, res) {
    const {id} = req.params;
    res.render("update", {id: id});
}

async function updateKeyboardPost(req, res) {
    const {id} = req.params;
    const keyboard = await db.getKeyboard(id);
    const {name, stock, brand, size, switchType, connectionType} = req.body;
    let newInfo = [
        name || keyboard.name, 
        stock || keyboard.stock, 
        brand || keyboard.brand, 
        size || keyboard.size, 
        switchType || keyboard.switchType, 
        connectionType || keyboard.connectionType
    ];

    await db.updateKeyboard(id, newInfo);
    res.redirect(`/keyboards/keyboard/${id}`);
}

export {
    getKeyboards,
    addKeyboardGet,
    addKeyboardPost,
    deleteKeyboard,
    getKeyboard,
    updateKeyboardGet,
    updateKeyboardPost,
}