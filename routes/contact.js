// Import Packages
const express = require('express')
const mysql = require('mysql')

// Create Router
const router = express.Router()

// GET Messages
router.get('/messages', (request, response) => {
    console.log("All Messages")
    response.end()
  })

// GET All Contacts
router.get("/contacts", (request, response) => {
    const connection = getConnection()
    // console.log("Fetching all contacts")
    
    // Define SQL Query
    const queryString = "SELECT * FROM identification"
    // Perform SQL Query
    connection.query(queryString, (err, rows, fields) => {
        // If query generates an error
        if (err) {
            console.log("error connecting: " + err);
            response.sendStatus(500)
            return
        }
        // Else, no error -- query is successful.
        //console.log('Successful Query');
        response.json(rows)
    })
})

// GET Single Contact
router.get("/contacts/:id", (request, response) =>{
    const connection = getConnection()
    console.log("Fetching contact with id: " + request.params.id)
  
    // Define SQL Query
    const contactId = request.params.id
    var queryString = "SELECT * FROM identification WHERE id = ?"
    // Perform SQL Query
    connection.query(queryString, [contactId], (err, rows, fields) => {
        // If query generates an error
        if (err) {
            console.error('error connecting: ' + err);
            response.sendStatus(500)
            return;
        }
        // Else, no error -- query is successful.
        console.log('Successful Query');
        response.json(rows)
    })
})

// POST new Contact
router.post('/contact_create', (request, response) => {
    const connection = getConnection()
    console.log("Creating new contact...")
  
    // Parse form elements from contact_create form
    const FirstName = request.body.FirstName
    const LastName = request.body.LastName
    const DOB = request.body.DOB
    const Gender = request.body.Gender
    const Title = request.body.Title
  
    // Define SQL Query
    var queryString = "INSERT INTO identification (FirstName, LastName, DOB, Gender, Title) VALUES (?, ?, ?, ?, ?)"
    // Perform SQL Query
    connection.query(queryString, [FirstName, LastName, DOB, Gender, Title], (err, results, fields) => {
        // If query generates an error
        if (err) {
            console.error('error connecting: ' + err);
            response.sendStatus(500)
            return;
        }
        // Else, no error -- query is successful.
        console.log('Successful Query -- inserted new contact: ', results.insertId);
        response.end()
    })
})
/*
// Local connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '2018Challenger',
    database: 'MS3_contacts'
})
*/
// Heroku connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b4e37350e5cd47',
    password: '00f92433',
    database: 'heroku_797d1639e71eabf'
})

// Connect to Database
function getConnection() { 
    return pool
}

module.exports = router