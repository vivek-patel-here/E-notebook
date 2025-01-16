import React, { useContext,  useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { NoteContext } from "../NoteState.jsx";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

function Note({ title, id, content, description }) {
  const [open, setOpen] = useState(false);

  //delete a note
  let { deleteNote,updateNote } = useContext(NoteContext);

  function handleDelete() {
    deleteNote(id);
  }

  //update note
  let [noteInput, setNoteInout] = useState({
    title,
    description,
    content,
  });

  const handleChange = (e) => {
    setNoteInout((prevNote) => {
      return { ...prevNote, [e.target.name]: [e.target.value] };
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateNote(noteInput.title,noteInput.description,noteInput.content,id)
    setOpen(false)
  };

  return (
    <>
      <div>
        <Modal open={open} onClose={() => setOpen(false)} center>
          <form className="InsideModal" onSubmit={handleUpdate}>
            <h1>Update note</h1>
            <div className="box">
              <label htmlFor="title">Title</label>

              <textarea
                type="text"
                id="title"
                name="title"
                placeholder="Enter your title"
                value={noteInput.title}
                onChange={handleChange}
              >

              </textarea>
            </div>
            <div className="box">
              <label htmlFor="description">Description</label>

              <textarea
                type="description"
                id="description"
                name="description"
                placeholder="Enter your description"
                value={noteInput.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="box">
              <label htmlFor="content">Content</label>
              <textarea
                type="content"
                id="content"
                name="content"
                placeholder="Enter your content"
                value={noteInput.content}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="btn-box">
            <button type="submit">Save Changes</button>
            </div>
          </form>

        </Modal>
      </div>

      <div className="Note">
        <h2>{title}</h2>
        <p>
          {" "}
          {description &&
            description.length &&
            description.slice(0, 20) + "..."}
        </p>

        <p className="btn-container">
          <Button size="small" onClick={handleDelete}>
            <DeleteIcon color="error" />
          </Button>
          <Button size="small" onClick={() => setOpen(true)}>
            {" "}
            <EditIcon color="success" />
          </Button>
        </p>
      </div>
    </>
  );
}

export default Note;
