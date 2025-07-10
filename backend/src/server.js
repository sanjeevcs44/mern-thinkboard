import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import swaggerUi from 'swagger-ui-express' // Import Swagger UI for API documentation
import fs from 'fs' // Import file system module to read files
import { connectDB } from './config/db.js' // Import the database connection function
import dotenv from 'dotenv'
import cors from 'cors' // Import CORS middleware to enable Cross-Origin Resource Sharing

import rateLimiterMiddleware from './middleware/rateLimiter.js'
dotenv.config() // Load environment variables from .env file

const app = express() // Create an Express application
const PORT = process.env.PORT || 5001 // Use the PORT from environment variables or default to 5001
app.use(cors()) // Enable CORS for all routes
app.use(express.json()) // Middleware to parse JSON request bodies in Express

// app.use((req, res, next) => {
//   console.log('req', req.method, req.url) // Log the request method and URL
//   next
// })

app.use(rateLimiterMiddleware)
app.use('/api/notes', notesRoutes) // Use the notes routes for handling note-related requests

const swaggerDocument = JSON.parse(fs.readFileSync('./openapi.json', 'utf8')) // Read the OpenAPI specification from a file
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // Set up Swagger UI for API documentation
connectDB().then(
  app.listen(PORT, () => {
    console.log('server started on port', PORT) // Start the server and listen on the specified port
    console.log('env variable', process.env.MONGO_URI) // Log the MongoDB URI
    console.log('env variable', process.env.PORT) // Log the port number
  })
) // Connect to MongoDBs
