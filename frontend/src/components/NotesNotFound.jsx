import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">No notes found</h2>
      <p className="text-lg">Create your first note to get started!</p>
      <NotebookIcon className="size-16 text-gray-400 mt-4" />
      <p className="text-sm text-gray-500 mt-2">
        If you have created notes but they are not showing up, please check your
        network connection or try refreshing the page.
      </p>
      <Link to="/create" className="btn btn-primary mt-6">
        Create Note
      </Link>
      <p className="text-sm text-gray-500 mt-2">
        Need help? Check our{' '}
        <a
          href="        "
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          documentation
        </a>
        .
      </p>
    </div>
  )
}

export default NotesNotFound
