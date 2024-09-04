import React, { useEffect, useRef, useContext } from "react";
import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { NotesContext } from "../context/NotesContext";
import { db } from "../appwrite/databases";

const AddButton = () => {
  const startingPos = useRef(10);
  const { setNotes, setSelectedNote } = useContext(NotesContext);
  const addButtonRef = useRef(null);

  const addNote = async () => {
    console.log("Adding note");
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[0]),
    };
    startingPos.current += 10;

    const response = await db.notes.create(payload);
    setNotes((prevState) => [...prevState, response]);
    setSelectedNote(response);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.altKey && event.code === "Space") {
        addButtonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div id="add-btn" onClick={addNote} ref={addButtonRef}>
      <Plus />
    </div>
  );
};

export default AddButton;
