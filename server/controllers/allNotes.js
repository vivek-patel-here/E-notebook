const {Note}=require("../models/note.js")

const allNotesLogic= async (req, res) => {
    let allNotes = await Note.find();
    if (allNotes && allNotes.length) {
      return res.status(200).json({
        message: "Notes fetched successfully!",
        allNotes,
        success: true,
      });
    }
    return res.status(404).json({
      message: "Unable to retrieve notes at the moment. Please try again later.",
      success: false,
    });
  }

module.exports={allNotesLogic}