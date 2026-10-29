import express from "express";
import {getKeyboards, addKeyboardGet, addKeyboardPost, deleteKeyboard, getKeyboard, updateKeyboardGet, updateKeyboardPost} 
from "../controllers/keyboardController.js";

const keyboardRouter = express.Router();

keyboardRouter.get("/", getKeyboards);

keyboardRouter.get("/add", addKeyboardGet);
keyboardRouter.post("/add", addKeyboardPost);

keyboardRouter.get("/delete/:id", deleteKeyboard);
keyboardRouter.get("/keyboard/:id", getKeyboard);

keyboardRouter.get("/update/:id", updateKeyboardGet);
keyboardRouter.post("/update/:id", updateKeyboardPost);

export default keyboardRouter;