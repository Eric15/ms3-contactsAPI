// Import Packages
const express = require('express')
const mysql = require('mysql')
const db = require('../config/db')

// Create Router
const router = express.Router()

/* GET Routes */

// GET All Contacts (Identification)
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

// GET Single Contact (Identification)
router.get("/contacts/:contact_id", (request, response) =>{
    const connection = getConnection()
    console.log("Fetching contact with contact_id: " + request.params.contact_id)
  
    // Define SQL Query
    const contactId = request.params.contact_id
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

// GET All Addresses
router.get("/addresses", (request, response) => {
    const connection = getConnection()
    console.log("Fetching all addresses")
    
    // Define SQL Query
    const queryString = "SELECT * FROM address"
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

// GET Addresses for Single Contact (Identification)
router.get("/addresses/:contact_id", (request, response) =>{
    const connection = getConnection()
    console.log("Fetching addresses for contact with contact_id: " + request.params.contact_id)
  
    // Define SQL Query
    const contactId = request.params.contact_id
    var queryString = "SELECT * FROM address WHERE contact_id = ?"
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

// GET All Communications
router.get("/communications", (request, response) => {
    const connection = getConnection()
    console.log("Fetching all communications")
    
    // Define SQL Query
    const queryString = "SELECT * FROM communication"
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

// GET Communications for Single Contact (Identification)
router.get("/communications/:contact_id", (request, response) =>{
    const connection = getConnection()
    console.log("Fetching communications for contact with contact_id: " + request.params.contact_id)
  
    // Define SQL Query
    const contactId = request.params.contact_id
    var queryString = "SELECT * FROM communication WHERE contact_id = ?"
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

/* POST Routes */

// POST new Contact (Identification)
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

/* PUT Routes */

// PUT (update) existing Contact
router.put('/contact_update', (request, response) => {
    const connection = getConnection()
    console.log("Updating contact...")
  
    // Parse form elements from contact_create form
    const ContactID = request.body.ContactID
    const FirstName = request.body.FirstName
    const LastName = request.body.LastName
    const DOB = request.body.DOB
    const Gender = request.body.Gender
    const Title = request.body.Title
  
    // Define SQL Query
    var queryString = "UPDATE identification SET FirstName = ?, LastName = ?, DOB = ?, Gender = ?, Title = ? WHERE contact_id = ?"
    // Perform SQL Query
    connection.query(queryString, [FirstName, LastName, DOB, Gender, Title, ContactID], (err, results, fields) => {
        // If query generates an error
        if (err) {
            console.error('error connecting: ' + err);
            response.sendStatus(500)
            return;
        }
        // Else, no error -- query is successful.
        console.log('Successful Query -- updated contact: ', results);
        response.end()
    })
});

// PUT (update) existing Address
router.put('/address_update', (request, response) => {
    const connection = getConnection()
    console.log("Updating address for contact: " + params.body.ContactID)
  
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
    var queryString = "UPDATE address SET contact_id = ?, Type = ?, Number = ?, Street = ?, Unit = ?, City = ?, State = ?, Zipcode = ? WHERE contact_id = ?"
    // Perform SQL Query
    connection.query(queryString, [Type, Number, Street, Unit, City, State, Zipcode, ContactID], (err, results, fields) => {
        // If query generates an error
        if (err) {
            console.error('error connecting: ' + err);
            response.sendStatus(500)
            return;
        }
        // Else, no error -- query is successful.
        console.log('Successful Query -- updated address: ', results);
        response.end()
    })
})

// PUT (update) existing Communication
router.put('/communication_update', (request, response) => {
    const connection = getConnection()
    console.log("Updating communication for contact: " + params.body.ContactID)
  
    // Parse form elements from contact_create form
    const ContactID = request.body.ContactID
    const Type = request.body.Type
    const Value = request.body.Value
    const Preferred = checkboxToBinary(request.body.Preferred)
  
    // Define SQL Query
    var queryString = "UPDATE communication SET Type = ?, Value = ?, Preferred = ?) WHERE contact_id = ?"
    // Perform SQL Query
    connection.query(queryString, [Type, Value, Preferred, ContactID], (err, results, fields) => {
        // If query generates an error
        if (err) {
            console.error('error connecting: ' + err);
            response.sendStatus(500)
            return;
        }
        // Else, no error -- query is successful.
        console.log('Successful Query -- updated address: ', results);
        response.end()
    })
})

/* DELETE Routes */

// DELETE Single Contact (Identification)
router.delete("/contacts/delete/:contact_id", (request, response) =>{
    const connection = getConnection()
    console.log("Deleting contact with contact_id: " + request.params.contact_id)
  
    // Define SQL Query
    const contactId = request.params.contact_id
    var queryString = "DELETE FROM identification WHERE contact_id = ?"
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

// DELETE single Address
router.get("/addresses/delete/:address_id", (request, response) =>{
    const connection = getConnection()
    console.log("Deleting address with address_id: " + request.params.address_id)
  
    // Define SQL Query
    const addressId = request.params.address_id
    var queryString = "DELETE FROM address WHERE address_id = ?"
    // Perform SQL Query
    connection.query(queryString, [addressId], (err, rows, fields) => {
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

// DELETE single Communication
router.get("/communications/delete/:communication_id", (request, response) =>{
    const connection = getConnection()
    console.log("Deleting communication with communication_id: " + request.params.communication_id)
  
    // Define SQL Query
    const communicationId = request.params.communication_id
    var queryString = "DELETE FROM address WHERE communication_id = ?"
    // Perform SQL Query
    connection.query(queryString, [communicationId], (err, rows, fields) => {
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
    if (checkboxValue === "on") {
        return true;
    }
    else {
        return false;
    }
}

module.exports = router