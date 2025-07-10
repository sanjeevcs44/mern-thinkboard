import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import api from '../lib/axios'
import { ArrowLeft, ArrowLeftCircle, Loader2Icon } from 'lucide-react'
import toast from 'react-hot-toast'

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  console.log('useParams', useParams())
  console.log('id', id)
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return
    try {
      setSaving(true)
      await api.delete(`notes/${id}`)
      toast.success('Note deleted successfully!')
      setSaving(false)
      navigate('/')
    } catch (error) {
      console.error('Error deleting note:', error)
      setSaving(false)
      alert('Failed to delete note. Please try again later.')
    }
  }
  const handleSave = async () => {
    if (!note || !note.title.trim() || !note.content.trim()) {
      toast.error('Title and content are required')
      return
    }
    try {
      setSaving(true)
      const response = await api.put(`notes/${id}`, {
        title: note.title,
        content: note.content,
      })
      if (response.status !== 200) {
        throw new Error('Failed to save note')
      }
      setSaving(false)
      toast.success('Note saved successfully!')
      navigate('/')
    } catch (error) {
      console.error('Error saving note:', error)
      setSaving(false)
      alert('Failed to save note. Please try again later.')
    }
  }
  // Fetch note details by ID
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`notes/${id}`)
        if (response.status !== 200) {
          throw new Error('Failed to fetch note')
        }
        const data = response.data
        setNote(data)
      } catch (error) {
        console.error('Error fetching note:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])
  console.log('fetchNote called', { note })
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="size-8 animate-spin text-primary" />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost mb-6">
              <ArrowLeftCircle className="size-5" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="note title"
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  value={note?.title}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  value={note?.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                  placeholder="note content"
                ></textarea>
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
