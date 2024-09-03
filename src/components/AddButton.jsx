import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useRef, useContext } from "react";
import { NotesContext } from '../context/NotesContext';
import { db } from "../appwrite/databases";


 
const AddButton = () => {
    const startingPos = useRef(10);
    const { setNotes } = useContext(NotesContext);
 
    const addNote = async () => {
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
    };
 
    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;