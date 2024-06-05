
const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors');

const dbDetails = require("../database/dbConfig")(); //importing the function from dbConfig.js

const PORT = 8000;

app.use(express.json()); // Middleware required for accessing post data.
app.use(cors()); // Enable CORS for all routes

// Creating the MySQL connection object
var con = mysql.createConnection({
    host: dbDetails.host,
    user: dbDetails.user,
    password: dbDetails.password,
    database: dbDetails.database
});

// Connecting to the database
con.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Successfully connected to the ${dbDetails.database} database`);
    }
});

// Setting up app to listen on port
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`App listening on Port: ${PORT}`);
    }
});

// GET request to route 'learning_paths'
app.get("/learning_paths", (req, res) => {
    con.query("SELECT * FROM learning_paths", (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.send(results);
        }
    });
});

// POST request to route '/add_note/:subject'
app.post("/add_note/:subject", (req, res) => {
    let subject = req.params.subject;
    let note_content = req.body.noteContent;
    let note_title = req.body.noteTitle;
    let code_content = req.body.codeContent;

    // Insert notes data into the notes table
    let my_query = `INSERT INTO notes (note_title, note_subject, note_description, code_snippet) VALUES (?, ?, ?, ?)`;
    con.query(my_query, [note_title, subject, note_content, code_content], (error, results) => {
        if (error) {
            res.send(error);
        } else {
            // Get all the notes data from the notes table for viewing purposes
            con.query("SELECT * FROM notes", (error, results) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(results);
                }
            });
        }
    });
});

// GET request to route '/get_notes/:subject'
app.get("/get_notes/:subject", (req, res) => {
    let subject = req.params.subject;

    let my_query = `SELECT * FROM notes WHERE note_subject= (?)`;
    con.query(my_query, [subject], (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.send(results);
        }
    });
});

// GET request to route '/get_note/:title'
app.get("/get_note/:title", (req, res) => {
    let title = req.params.title;

    let my_query = "SELECT * FROM notes WHERE note_title = (?)";
    con.query(my_query, [title], (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.send(results);
        }
    });
});
