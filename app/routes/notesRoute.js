module.exports = (app) => {
  const Notes = require("../controller/NotesController");

  app.get("/notes", Notes.findAll);

  app.get("/notes/:NoteName", Notes.findNote);

  app.post("/users/:userId/notes", Notes.createUsersNote);

  app.get("/users/:user_id/notes", Notes.getUsersNote);
};
