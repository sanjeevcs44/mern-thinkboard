import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitUI from '../components/RateLimitUI'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        const data = res.data
        setNotes(data)
        setIsRateLimited(false)
        console.log(data)
      } catch (error) {
        console.error('Error fetching notes:', error)
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true)
        } else {
          console.error('Error fetching notes:', error)
          toast.error('Failed to fetch notes. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitUI />}
      <div className="max-w-7xl p-4 m-auto mt-6">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader className="size-8 animate-spin text-primary" />
          </div>
        )}
        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
