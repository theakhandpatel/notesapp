import { useContext } from "react";
import { db } from "../appwrite/databases";
import { NotesContext } from "../context/NotesContext";

const Color = ({ color }) => {
  const {selectedNote,notes,setNotes} = useContext(NotesContext);
 
  const changeColor = () => {
    console.log("Selected color:", selectedNote);
 
    try {

        const currentNoteIndex = notes.findIndex(
            (note) => note.$id === selectedNote.$id
        );

        console.log("Current note index:", currentNoteIndex,color);
 
        const updatedNote = {
            ...notes[currentNoteIndex],
            colors: JSON.stringify(color),
        };
 
        const newNotes = [...notes];
        newNotes[currentNoteIndex] = updatedNote;
        console.log("New notes:", newNotes);
        setNotes(newNotes);
 
        db.notes.update(selectedNote.$id, {
            colors: JSON.stringify(color),
        });
    } catch (error) {
        alert("You must select a note before changing colors");
    }
  };

  return (
      <div
          onClick={changeColor}
          className="color"
          style={{ backgroundColor: color.colorHeader }}
      ></div>
  );
};


export default Color;