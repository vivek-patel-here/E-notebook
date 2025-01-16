const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    required: [true, "Unable to track the author of the note"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);
module.exports = { Note };
