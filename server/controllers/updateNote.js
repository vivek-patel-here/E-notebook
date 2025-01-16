const { Note } = require("../models/note.js");

const updateNoteLogic = async (req, res) => {
  let { noteid } = req.params;
  let note = await Note.findById(noteid);
  if (!note) {
    return res
      .status(404)
      .json({ meassage: "Note not found!", success: false });
  }
  if (note.author != req.user.id) {
    return res.status(401).json({
      message:
        "Access Denied. You do not have the necessary permissions to perform this action",
      success: false,
    });
  }

  let newValues = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
  };
  const updatednote = await Note.findByIdAndUpdate(noteid, newValues);
  if (!updatednote) {
    return res.status(500).json({
      message: "Unable to process your request due to internal server Error",
      success: false,
    });
  }
  res
    .status(200)
    .json({ message: "Note has been updated successfully!", success: true });
};

module.exports = { updateNoteLogic };
