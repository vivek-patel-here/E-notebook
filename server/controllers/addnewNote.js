const { Note } = require("../models/note.js");


const addNewNoteLogic = async (req, res) => {
  let { title, description, content } = req.body;
  let newNote = new Note({
    title,
    description,
    content,
    author: req.user.id,
  });
  let addedNote = await newNote.save();
  if (!addedNote) {
    return res.status(500).json({
      message: "Unable to process your request due to internal server Error",
      success: false,
    });
  }

  res.status(200).json({
    message: `A new note has been added successfully by the author ${req.user.name}`,
    success: true,
    addedNote
  });
};

module.exports={addNewNoteLogic}

