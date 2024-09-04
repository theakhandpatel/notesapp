import { useContext } from "react";
import { db } from "../appwrite/databases";
import Trash from "../icons/Trash";
import { NotesContext } from "../context/NotesContext";

const DeleteButton = ({ noteId }) => {
  const {setNotes} = useContext(NotesContext);

  const handleDelete = async () => {
    db.notes.delete(noteId);
    setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
  };

  return (
    <div className="delete-button" onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
