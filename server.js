const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { dataBase } = require("./app/model/dbConfig");
require("./app/routes/userRoute")(app);
require("./app/routes/notesRoute")(app);

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

app.use((err, req, res, next) =>
  res.status(err.status || 500).render("error", {
    message: err.message || "Something went wrong!",
    title: err.title || "Internal Server Error",
  })
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
