import {body, param} from "express-validator";
import * as db from "../db/queries.js";


const SIZES = [60, 75, 80, 100];
const SWITCH_TYPES = ["thocky", "silent"];
const CONNECTION_TYPES = ["wired", "wireless"];
const validateFormInput = [
    body("name").trim()
    .isLength({min: 1, max: 50}).withMessage("Name must be between 1 and 50 characters"),

    body("stock").trim()
    .isInt({min: 0, max: 10000}).withMessage("Stock must must be between 0 and 10,000")
    .toInt(),

    body("brand").trim()
    .isLength({min: 1, max: 50}).withMessage("Brand must be between 1 and 50 characters"),

    body("size").trim()
    .isIn(SIZES).withMessage("Must select 60, 75, 80, or 100 as the size")
    .toInt(),

    body("switchType").trim().toLowerCase()
    .isIn(SWITCH_TYPES).withMessage("Must select thocky or silent for switch type"),

    body("connectionType").trim().toLowerCase()
    .isIn(CONNECTION_TYPES).withMessage("Must select wired or wireless for connection type")
];

const validateId = [
    param("id").isInt({min: 1}).withMessage("Invalid book id").bail()
    .custom(async (id) => {
        const keyboard = db.getKeyboard(id);
        if (!keyboard) throw new Error(`Keyboard not found, id: ${id}`);
    })
    .toInt(),
];

export {
    validateFormInput,
    validateId,
}



/*
name, stock, brand, size, switchType, connectionType = req.body
id = req.params (also custom for if id is in DB)

name must be 1 to 50 characters (inclusive)
stock is 0 to 10000 (inclusive)
brand is same as name, 1-50
size must be 60, 75, 80, or 100
switch type must be thocky or silent
conn type must be wired/wireless

Validators check a value: notEmpty(), isLength(), isInt(), isIn(), isAlpha(), isEmail(), custom()
Sanitizers change a value: trim(), escape(), toInt(), toFloat(), toLowerCase()
*/