const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//NOTE SCHEMA
const NotesSchema = new Schema(
    {
      title: String,
      content: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", requured: true},
    },
    {
      timestamps: true,
    }
  );
 Notes = mongoose.model("Note", NotesSchema);


  module.exports =  Notes;