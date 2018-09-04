// Import Packages
const express = require('express')
const mysql = require('mysql')
const db = require('../config/db')

// Create Router
const router = express.Router()

// GET All Contacts
router.get("/contacts", (request, response) => {
    const connection = getConnection()
    console.log("Fetching all contacts")
    
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
        console.log('Successful Query');
        response.json(rows)
    })
})

// GET Single Contact
router.get("/contacts/:id", (request, response) =>{
    const connection = getConnection()
    console.log("Fetching contact with id: " + request.params.id)
  
    // Define SQL Query
    const contactId = request.params.id
    var queryString = "SELECT * FROM identification WHERE contact_id = ?"
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

// POST new Address
router.post('/address_create', (request, response) => {
    const connection = getConnection()
    console.log("Creating new address...")
  
    // Parse form elements from contact_create form
    const ContactID = request.body.ContactID
    const Type = request.body.Type
    const Number = request.body.Number
    const Street = request.body.Street
    const Unit = request.body.Unit
    const City = request.body.City
    const State = request.body.State
    const Zipcode = request.body.Zipcode
  
    // Define SQL Query
    var queryString = "INSERT INTO address (contact_id, Type, Number, Street, Unit, City, State, Zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    // Perform SQL Query
    connection.query(queryString, [ContactID, Type, Number, Street, Unit, City, State, Zipcode], (err, results, fields) => {
        // If query generates an error
        if (err) {
            console.error('error connecting: ' + err);
            console.error(queryString, [ContactID, Type, Number, Street, Unit, City, State, Zipcode]);
            response.sendStatus(500)
            return;
        }
        // Else, no error -- query is successful.
        console.log('Successful Query -- inserted new address: ', results.insertId);
        response.end()
    })
})

// POST new Communication
router.post('/communication_create', (request, response) => {
    const connection = getConnection()
    console.log("Creating new communication...")
  
    // Parse form elements from contact_create form
    const ContactID = request.body.ContactID
    const Type = request.body.Type
    const Value = request.body.Value
    const Preferred = checkboxToBinary(request.body.Preferred)
  
    // Define SQL Query
    var queryString = "INSERT INTO communication (contact_id, Type, Value, Preferred) VALUES (?, ?, ?, ?)"
    // Perform SQL Query
    connection.query(queryString, [ContactID, Type, Value, Preferred], (err, results, fields) => {
        // If query generates an error
        if (err) {
            console.error('error connecting: ' + err);
            console.error(queryString, [ContactID, Type, Value, Preferred]);
            response.sendStatus(500)
            return;
        }
        // Else, no error -- query is successful.
        console.log('Successful Query -- inserted new address: ', results.insertId);
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
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
})

// Connect to Database
function getConnection() { 
    return pool
}

// Return 0 for NULL value
function checkboxToBinary(checkboxValue){
    if (checkboxValue === null) {
        return 'FALSE';
    }
    else {
        return 'TRUE';
    }
}

module.exports = router