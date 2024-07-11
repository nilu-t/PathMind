const express = require('express');
const app = express();
const mysql = require('mysql2');
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

//hen a user signs up, their email should be added to the users table.
app.post("/add_user", (req, res) => {
    const userEmail = req.body.email;

    let userQuery = `INSERT INTO users (email) VALUES (?)`;
    con.query(userQuery, [userEmail], (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.send({ message: "User added successfully!" });
        }
    });
});

// POST request to route '/add_note/:subject'
app.post("/add_note/:subject", (req, res) => {
    const subject = req.params.subject;
    const note_content = decodeURIComponent(req.body.noteContent);
    const note_title = req.body.noteTitle;
    const code_content = decodeURIComponent(req.body.codeContent);
    const user_email = req.body.userEmail;

    let userQuery = `SELECT * FROM users WHERE email = ?`;
    con.query(userQuery, [user_email], (error, results) => {
        if (error) {
            res.send(error);
        } else {
            if (results.length > 0) {
                // Insert notes data into the notes table
                let noteQuery = `INSERT INTO notes (note_title, note_subject, note_description, code_snippet, user_email) VALUES (?, ?, ?, ?, ?)`;
                con.query(noteQuery, [note_title, subject, note_content, code_content, user_email], (error, results) => {
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
            } else {
                res.send({ message: "User not found!" });
            }
        }
    });
});


// GET request to route '/get_notes/:subject'
app.get("/get_notes/:subject", (req, res) => {
    let subject = req.params.subject;
    let user_email = req.query.email;

    let my_query = `SELECT * FROM notes WHERE note_subject= (?) AND user_email = ?`;
    con.query(my_query, [subject, user_email], (error, results) => {
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

    let my_query = "SELECT * FROM notes WHERE note_title = ?";
    con.query(my_query, [title], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(results);
        }
    });
});
