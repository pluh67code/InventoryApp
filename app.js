import express from "express";
import indexRouter from "./routes/indexRouter.js";
import keyboardRouter from "./routes/keyboardRouter.js";

const app = express();
const port = process.env.PORT || 8080;

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use("/", indexRouter);
app.use("/keyboards", keyboardRouter);


app.listen(port, (err) => {
    if (err) throw err;
    console.log(`App started, port: ${port}`);
});