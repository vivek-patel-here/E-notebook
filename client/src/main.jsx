import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { hashRouter } from "react-router-dom";
import { NoteState } from "./NoteState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NoteState>
      <hashRouter>
        <App />
      </hashRouter>
    </NoteState>
  </StrictMode>
);
