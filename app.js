import express from "express";
import indexRouter from "./routes/indexRouter.js";
import keyboardRouter from "./routes/keyboardRouter.js";

const app = express();
const port = process.env.PORT || 8080;

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/keyboards", keyboardRouter);


// 404 specific handler (ex: "/poop/idk")
app.use((req, res) => {
    res.status(404).render("error", { message: "Page not found" });
});

// error log + handler
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    if (status === 500) console.error(err);

    return res.status(status).render("error", {
        message: status === 500 ? "Something went wrong" : err.message
    });
});
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`App started, port: ${port}`);
});