const {Note}=require("../models/note.js");

const myNotesLogic = async (req, res) => {
    let mynotes = await Note.find({ author: req.user.id });
    console.log(req.user);
    if (mynotes && mynotes.length) {
      return res.status(200).json({
        message: "Notes fetched successfully!",
        mynotes,
        success: true,
      });
    }
    return res.status(404).json({
      message: "Unable to retrieve notes at the moment. Please try again later.",
      success: false,
    });
  }

  module.exports={myNotesLogic}
