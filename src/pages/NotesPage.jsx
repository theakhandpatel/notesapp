import { useContext } from 'react';
import NoteCard from '../components/NoteCard'
import { NotesContext } from '../context/NotesContext';
import Controls from '../components/Controls';


function NotesPage() {
  const {notes, setNotes, setSelectedNote} = useContext(NotesContext);

  return (
    <div>
      {notes.map((note, index) => (
        <NoteCard key={index} note={note} setNotes={setNotes} setSelectedNote={setSelectedNote} />
      ))}
      <Controls />
    </div>
  )
}

export default NotesPage