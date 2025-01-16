import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

const NoteContext = createContext();

function NoteState(props) {
  let noteArr = [
    {
      _id: "67862f6612098e2c805b2ed4",
      author: "6785017bbf087ea5d46ed186",
      title: "OOps! Unable to load Your Notes",
      description: "This might happen due to weak connection",
      content: "This a example Note",
      __v: 0,
    },
  ];
  //notes State variables
  const [notes, setNotes] = useState(noteArr);

  // function to get notes
  async function getNotes() {
    let response = await fetch("https://e-notebook-server.onrender.com/notes/mynotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${localStorage.getItem("token")}`,
      },
    });

    let result = await response.json();
    if(!result.success){
      toast.error(result.message,{autoClose:1500,position:"top-center"})
    }
    setNotes(result["mynotes"]);
  }

  //function to add new note
  async function addnewNote({ title, description, content }) {
    let response = await fetch("https://e-notebook-server.onrender.com/notes/mynotes/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title.toString(),
        description: description.toString(),
        content: content.toString(),
      }),
    });

    let result = await response.json();
    if (!result.success) {
      return toast.error(result.message, {
        autoClose: 1500,
        position: "top-center",
      });
    }

    setNotes((prevNotes) => {
      return [...prevNotes, result.addedNote];
    });
    toast.success(result.message, { autoClose: 1500, position: "top-center" });
  }

  //delete function
  async function deleteNote(id) {
    let response = await fetch(`https://e-notebook-server.onrender.com/notes/mynotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
    });

    let result = await response.json();
    if (!result.success) {
      return toast.error(result.message, {
        autoClose: 1500,
        position: "top-center",
      });
    }
    toast.success("Note deleted successfully!", {
      autoClose: 1500,
      position: "top-center",
    });
    setNotes(
      notes.filter((note) => {
        if (note._id != id) {
          return note;
        }
      })
    );
  }

  //update function
  async function updateNote(title, description, content, id) {
    let response = await fetch(`https://e-notebook-server.onrender.com/notes/mynotes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title.toString(),
        description: description.toString(),
        content: content.toString(),
      }),
    });

    let result =await response.json()
    if(!result.success){
      return toast.error(result.message,{autoClose:1500,position:"top-center"})
    }
    setNotes(
      notes.map((note) => {
        if (note._id == id) {
          note.title = title.toString();
          note.description = description.toString();
          note.content = content.toString();
          console.log(note);
        }
        return note;
      })
    );
    toast.success(result.message,{autoClose:1500,position:"top-center"})
  }

  return (
    <NoteContext.Provider
      value={{ notes, addnewNote, deleteNote, updateNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export { NoteContext, NoteState };
