const { Note } = require("../models/note.js");


let specificNoteLogic = async (req, res) => {
  let { noteid } = req.params;
  let note = await Note.findById(noteid);
  if (!note) {
    return res
      .status(404)
      .json({ meassage: "Note not found!", success: false });
  }
  res.status(200).json({ meassage: "Note found!", success: true, note });
}

module.exports={specificNoteLogic}
