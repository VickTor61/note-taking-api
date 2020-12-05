const { Users } = require("../model/dbConfig");

exports.create = (req, res) => {
  const user = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  user
    .save()
    .then((userData) => {
      res.send(userData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occure+d while creating user",
      });
    });
};

exports.findAll = (req, res) => {
  Users.find()
    .then((foundUser) => {
      res.send(foundUser);
    })
    .then((err) => {
      res.send({
        message: "user unavailable",
      });
    });
};

//Find a single user

exports.findOne = (req, res) => {
  Users.findById(req.params.userId)
    .then((founduser) => {
      !founduser ? res.send("user not found") : res.send(founduser);
    })
    .catch((err) => {
      return res.status(404).send({
        message: "User is not found ",
      });
    });
};

//UPDATE USERS

exports.updateOne = (req, res) => {
  Users.findByIdAndUpdate(
    req.params.userId,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.send("updated user with contents: " + updatedUser);
    })
    .catch((err) => {
      if (err) {
        return res.status(404).send({
          message: "unabale to update user",
        });
      }
    });
};

exports.updateOneUser = (req, res) => {
  Users.findByIdAndUpdate(req.params.userId, req.body)
    .then((updatedUser) => {
      res.send("updated user with contents: " + updatedUser);
    })
    .catch((err) => {
      if (err) {
        return res.status(404).send({
          message: "unabale to update user",
        });
      }
    });
};
exports.deleteUser = (req, res) => {
  Users.findByIdAndRemove(Req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.noteId,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.noteId,
      });
    });
};
