// Import Packages
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

// Middleware configuration
app.use(bodyParser.urlencoded({extended: false})) // For parsing form elements in POST actions
app.use(express.static('./public')) // Make static files in ./public accessible, e.g. Form.html
app.use(morgan('short')) // Output each http request to console

// Define & Use Router
const router = require('./routes/contact.js')
app.use(router)

// Root
app.get("/", (request, response) => {
  console.log("At Root Directory")
  response.send("Go to /Contacts to query all Contacts in database.")
})

const PORT = process.env.PORT || 3000
// serve on localhost:3000
app.listen(PORT, () => {
  console.log("Serving on localhost:" + PORT)
})
