import { useContext } from 'react';
import NoteCard from '../components/NoteCard'
import { NotesContext } from '../context/NotesContext';
import Controls from '../components/Controls';


function NotesPage() {
  const {notes} = useContext(NotesContext);

  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
      <Controls />
    </div>
  )
}

export default NotesPage