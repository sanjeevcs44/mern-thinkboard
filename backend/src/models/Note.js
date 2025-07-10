import mongoose from 'mongoose'
// Define the schema for a note
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
)
// Create a model from the schema
const Note = mongoose.model('Note', noteSchema)
// Export the Note model for use in other parts of the application
export default Note
// This model can be used to interact with the 'notes' collection in MongoDB
// For example, you can create, read, update, and delete notes using this model.
