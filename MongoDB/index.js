const express = require("express");
const app = express()
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//models
// SIMILAR CONCEPT - Reusable components
const TodoTask = require("./models/TodoTask");

dotenv.config();

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

//connection to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, (err) => {
    if(err) return console.error(err);
    console.log("Connected to db!");
    app.listen(5000, () => console.log("Server Up and running"));
    TodoTask.find({}, (err, tasks) => {
      console.log("These are Tasks" + tasks)
    });
  });

app.set("view engine", "ejs");

// GET METHOD
// SIMILAR CONCEPT - Routing
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    console.log("Task found")
    res.render("todo.ejs", { todoTasks: tasks });
    });
});

//POST METHOD
// UNIQUE CONCEPT - Asynchronous operations
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
});

//UPDATE
app
.route("/edit/:id")
.get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
})
.post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
});

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
});
