import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/util.js'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, noteId) => {
    e.preventDefault()
    // Implement delete functionality here
    if (!window.confirm('Are you sure you want to delete this note?')) return
    try {
      await api.delete(`/notes/${noteId}`)
      toast.success('Note deleted successfully!')
      // Update the notes state to remove the deleted note
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId))
      // Optionally, you can update the state to remove the note from the UI
      console.log(`Note with ID ${noteId} deleted`)
    } catch (error) {
      console.error(error)
      alert('Failed to delete note. Please try again later.')
    }
  }
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hove:shadow-lg transition-all duration-300 border-t-4 border-solid border-primary"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/50">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
