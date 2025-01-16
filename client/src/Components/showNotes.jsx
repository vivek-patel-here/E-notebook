import React, { useContext, useEffect, useState } from "react";
import Note from "./Note.jsx";
import { NoteContext } from "../NoteState.jsx";
import {ToastContainer} from 'react-toastify'

function AllNote() {
  let { notes, addnewNote,getNotes } = useContext(NoteContext);
  let [noteInput, setNoteInput] = useState({
    title: "",
    description: "",
    content: "",
  });

  const handleChange = (e) => {
    setNoteInput((prevNote) => {
      return { ...prevNote, [e.target.name]: [e.target.value] };
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    addnewNote(noteInput)
    setNoteInput({
      title: "",
      description: "",
      content: "",
    })
  }

  useEffect(()=>{
    getNotes()
  },[])
  
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Add new Note</h1>
        <div className="box">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your title"
            value={noteInput.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="box">
          <label htmlFor="description">Description</label>
          <input
            type="description"
            id="description"
            required
            name="description"
            placeholder="Enter your description"
            value={noteInput.description}
            onChange={handleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="content">Content</label>
          <textarea
            type="content"
            id="content"
            required
            name="content"
            placeholder="Enter your content"
            value={noteInput.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">+ Add Note</button>
      </form>
      <div className="Note-Container">
        <h2>Notes</h2>
       { !notes&& "Do not have any notes yet."}
        {notes &&
          notes.map((N) => {
            return <Note key={N._id} title={N.title} content={N.content} description={N.description} id={N._id}/>;
          })}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default AllNote;
