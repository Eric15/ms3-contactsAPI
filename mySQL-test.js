// Import Packages
const mysql = require('mysql')

// Connect to Database
function getConnection() { 
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2018Challenger',
        database: 'MS3_contacts'
    })
}

connection = getConnection()

// Parse form elements from contact_create form
const FirstName = "TestFN"
const LastName = "TestLN"
const DOB = '1900-01-01'
const Gender = "F"
const Title = "TestTitle"

// Define INSERT SQL Query
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
})

// Define DELETE SQL Query
queryString = "DELETE FROM identification WHERE FirstName = 'TESTFN'"
// Perform SQL Query
connection.query(queryString, (err, results, fields) => {
    // If query generates an error
    if (err) {
        console.error('error connecting: ' + err);
        response.sendStatus(500)
        return;
    }
    // Else, no error -- query is successful.
    console.log('Successful Query -- deleted test contact');
})

