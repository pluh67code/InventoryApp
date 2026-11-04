import * as db from "../db/queries.js";
import {validationResult, matchedData} from "express-validator";

async function getKeyboards(req, res) {
    const keyboards = await db.getKeyboards();
    res.render("keyboards", {keyboards});
}

function addKeyboardGet(req, res) {
    res.render("add");
}

async function addKeyboardPost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("add", {errors: errors.array(), keyboard: req.body});
    }
    const {name, stock, brand, size, switchType, connectionType} = matchedData(req);
    await db.addKeyboard({name, stock, brand, size, switchType, connectionType});
    res.redirect("/keyboards");
}

async function deleteKeyboard(req, res) {
    const {id} = matchedData(req);
    await db.deleteKeyboard(id);
    res.redirect("/keyboards");
}

async function getKeyboard(req, res) {
    const {id} = matchedData(req);
    const keyboard = await db.getKeyboard(id);
    res.render("keyboard", {keyboard});
}

async function updateKeyboardGet(req, res) {
    const {id} = matchedData(req);
    const keyboard = await db.getKeyboard(id);
    res.render("update", {keyboard});
}

async function updateKeyboardPost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("update", {
            errors: errors.array(),
            keyboard: {...req.body, id: req.params.id}
        })
    }

    const {id, name, stock, brand, size, switchType, connectionType} = matchedData(req);
    await db.updateKeyboard(id, {name, stock, brand, size, switchType, connectionType});
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