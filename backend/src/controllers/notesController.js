import Note from '../models/Note.js'

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }
    res.status(200).json(note)
  } catch (error) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getAllNotes(_, res) {
  try {
    const note = await Note.find().sort({ createdAt: -1 }) // Sort notes by creation date, newest first
    res.status(200).json(note)
  } catch (error) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body
    const newNote = new Note({
      title,
      content,
    })
    const savedNote = await newNote.save()
    res
      .status(201)
      .json({ message: 'Note created successfully!', note: savedNote })
  } catch (error) {
    console.error('Error creating note:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body
    const id = req.params.id
    console.log('id', req.params)
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      {
        new: true,
      }
    )
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' })
    }
    console.log('updatedNote', updatedNote)
    res
      .status(200)
      .json({ message: 'Note updated successfully!', note: updatedNote })
  } catch (error) {
    console.error('Error updating note:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function deleteNote(req, res) {
  try {
    const id = req.params.id
    const deletedNote = await Note.findByIdAndDelete(id)
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' })
    }
    res
      .status(200)
      .json({ message: 'Note deleted successfully!', note: deletedNote })
  } catch (error) {
    console.error('Error deleting note:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
