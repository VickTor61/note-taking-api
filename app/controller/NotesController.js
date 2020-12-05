const { Notes, Users } = require("../model/dbConfig");

exports.findAll = (req, res) => {
  Notes.find()
    .then((foundNotes) => {
      res.send(foundNotes);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Notes unavailable",
      });
    });
};

exports.findNote = (req, res) => {
  Notes.findOne({ title: req.params.NoteName })
    .then((foundNote) => {
      res.send(foundNote);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Note with name" +
          req.params.NoteName +
          "cannot be found in the database",
      });
    });
};

/////NESTED USER WITH HIS NOTES

exports.createUsersNote = (req, res, next) => {
  const newNote = new Notes(req.body);
  const { userId } = req.params;
  newNote.Users = userId;

  return newNote
    .save()
    .then( note => {
      return Users.findByIdAndUpdate(userId, {
        $addToSet: { notes: note._id },
      });
    })
    .then(() => {
      return res.send("suceessfully incorporated note to user");
    })
    .catch((err) => next(err));
};

//GET USERS NOTE
exports.getUsersNote = (req, res, next) => {
  return Users.findById(req.params.user_id)
    .populate("Notes")
    .exec()
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => next(err));
};
