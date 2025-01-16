const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { validateSchema } = require("../middlewares/validateSchema.js");
const { wrapAsync } = require("../middlewares/wrapAsync.js");
const { allNotesLogic } = require("../controllers/allNotes.js");
const { myNotesLogic } = require("../controllers/myNotes.js");
const { addNewNoteLogic } = require("../controllers/addnewNote.js");
const { specificNoteLogic } = require("../controllers/seeSpecificNote.js");
const { updateNoteLogic } = require("../controllers/updateNote.js");
const { deleteNoteLogic } = require("../controllers/deleteNote.js");

// To see all Notes
router.get("/allnotes", wrapAsync(allNotesLogic));

//Route to see user specific notes
router.get("/mynotes", wrapAsync(myNotesLogic));

//Route to add a new note
router.post(
  "/mynotes/new",
  [
    body("title", "Please enter a valid title").isString(),
    body("description", "Description must be string type Only!")
      .isString()
      .optional(),
    body(
      "content",
      "Oops! It seems you forgot to provide the content, and it must be of string type"
    ).isString(),
  ],
  validateSchema,
  wrapAsync(addNewNoteLogic)
);

// route to see a specific note
router.get("/mynotes/:noteid", wrapAsync(specificNoteLogic));

//route to update a specific note
router.patch(
  "/mynotes/:noteid",
  [
    body("title", "Please enter a valid title").isString().optional(),
    body("description", "Description must be string type Only!")
      .isString()
      .optional(),
    body("content", "content must be string type Only!").isString().optional(),
  ],
  validateSchema,
  wrapAsync(updateNoteLogic)
);

// delete route
router.delete("/mynotes/:noteid", wrapAsync(deleteNoteLogic));

module.exports = router;
