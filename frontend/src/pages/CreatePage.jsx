import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import api from '../lib/axios'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required')
      return
    }

    setLoading(true)
    try {
      await api.post('/notes', {
        title,
        content,
      })
      toast.success('Note created successfully!')
      Navigate('/')
    } catch (error) {
      console.error('Error creating note:', error)
      if (error.response && error.response.status === 429) {
        toast.error('slow dowm rate limter', {
          duration: 5000,
          icon: '❌',
        })
      } else {
        toast.error('Failed to create note.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={'/'} className="btn btn-ghost mb-6">
            <ArrowLeftIcon size={5} />
            Back to Home
          </Link>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-4">
              Create a new note
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea textarea-bordered"
                ></textarea>
              </div>
              <div className="card-actions justify-end mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'creating' : 'Create Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
