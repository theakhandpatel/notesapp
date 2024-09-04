import { useContext, useEffect, useRef, useState } from "react";
import Spinner from "../icons/Spinner";
import { autoGrow, setNewOffset, setZIndex, bodyParser } from "../util";
import { db } from "../appwrite/databases";
import DeleteButton from "./DeleteButton";
import { NotesContext } from "../context/NotesContext";

export default function NoteCard({ note }) {
  const [position, setPosition] = useState(bodyParser(note.position));
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);

  const { setSelectedNote } = useContext(NotesContext);
 
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);

  const colors = bodyParser(note.colors);
  const body = bodyParser(note.body);
  let mouseStartPos = { x: 0, y: 0 };

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  const handleKeyUp = async () => {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      console.log("Saving...");
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  const mouseMove = (e) => {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const mouseDown = (e) => {
    console.log('e.target.className:', e.target.className);
    if(e.target.className === 'card-header'){
      console.log('card-header was set',note);
      setZIndex(cardRef.current);
      mouseStartPos = { x: e.clientX, y: e.clientY };
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      setSelectedNote(note);
    }
  };

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={mouseDown}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={note.$id} />

        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <textarea
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          ref={textAreaRef}
          style={{
            color: colors.colorText,
          }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onKeyUp={handleKeyUp}
        ></textarea>
      </div>
    </div>
  );
}
