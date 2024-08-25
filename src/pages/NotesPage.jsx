import {fakeData as notes} from '../assets/fakeData.js'
import NoteCard from '../components/NoteCard'


function NotesPage() {
  return (
    <div>
      {notes.map((note, index) => (
        <NoteCard key={index} note={note} />
      ))}
    </div>
  )
}

export default NotesPage