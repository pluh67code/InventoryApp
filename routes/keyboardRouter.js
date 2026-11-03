import express from "express";
import {getKeyboards, addKeyboardGet, addKeyboardPost, deleteKeyboard, getKeyboard, updateKeyboardGet, updateKeyboardPost} 
from "../controllers/keyboardController.js";
import { validateFormInput, validateId } from "../validators/keyboardValidators.js";

const keyboardRouter = express.Router();

keyboardRouter.get("/", getKeyboards);

keyboardRouter.get("/add", addKeyboardGet);
keyboardRouter.post("/add", validateFormInput, addKeyboardPost);

keyboardRouter.get("/delete/:id", validateId, deleteKeyboard);
keyboardRouter.get("/keyboard/:id", validateId, getKeyboard);

keyboardRouter.get("/update/:id", validateId, updateKeyboardGet);
keyboardRouter.post("/update/:id", validateId, validateFormInput, updateKeyboardPost);

export default keyboardRouter;