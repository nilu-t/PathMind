const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const OpenAI = require("openai");
const dbDetails = require("../database/dbConfig")(); //importing the function from dbConfig.js

const PORT = 8000;

app.use(express.json()); // Middleware required for accessing post data.
app.use(cors()); // Enable CORS for all routes

//Creating the open ai connection object
const openai = new OpenAI({
    apiKey: dbDetails.open_ai_key, 
  });

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

//GET request to route 'enhance_note' to get the enhanced note content
app.get('/enhance_note', async(req,res) =>{

    let noteContent = decodeURIComponent(req.query.noteContent);
    let codeContent = decodeURIComponent(req.query.codeContent);
    let noteSubject = req.query.noteSubject;

    const messages = [
        { role: "system", content: "Optimize this note content" }, 
        { role: "user", content: `Enhance this coding note with note content: ${noteContent}, code content: ${codeContent}, note subject: ${noteSubject}` } 
      ];
    
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", //using chat gpt 3.5 model 
          messages: messages, 
          max_tokens: 1000, //we are telling the model that the output cannot go over this many tokens. 
        });
    
        const enhancedNote = response.choices[0].message.content.trim();
        
        res.send(enhancedNote);

      } catch (error) {
        console.error("Error enhancing note:", error);
        throw error;
      }
})

//when a user signs up, their email should be added to the users table.
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

// POST request to route '/add_note'
app.post("/add_note", (req, res) => {
    const subject = req.body.subject;
    const note_content = req.body.noteContent;
    const note_title = decodeURIComponent(req.body.noteTitle);
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

//POST request to route '/delete_note'
app.post("/delete_note", (req,res) =>{

    let user_email = req.body.userEmail;
    let note_title = req.body.noteTitle;

    let my_query = "DELETE FROM notes WHERE note_title = ? AND user_email = ?"

    con.query(my_query, [note_title, user_email], (error, results) =>{
        if(error){
            res.send(error)
        }
        else{
            res.send(results)
        }
    })
})


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
    let user_email = req.query.email;

    let my_query = "SELECT * FROM notes WHERE note_title = ? AND user_email = ?";
    con.query(my_query, [title, user_email], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(results);
        }
    });
});