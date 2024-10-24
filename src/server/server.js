const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const OpenAI = require("openai");
const dbDetails = require("../database/dbConfig")(); //importing the function from dbConfig.js
const fs = require('fs');
const multer = require('multer'); //middleware for handling file uploads into a specific directory. 
const path = require("path");
const pdfParse = require("pdf-parse");

const upload = multer({dest: 'uploaded_files/'}); 
const PORT = 8000;

app.use(express.json()); // Middleware required for accessing post data.
app.use(cors()); // Enable CORS for all routes

const executeQuery = async(req, res, my_query_params, my_query) =>{
    con.query(my_query, my_query_params, (error, results) =>{
        if (error) {
            res.status(500).send(error);
        } else {
            return results;
        }
    })
}

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
    const editor_state = JSON.stringify(req.body.editorState); //making sure to serialize the JSON before adding it. 
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
                let noteQuery = `INSERT INTO notes (note_title, note_subject, note_description, code_snippet, user_email, editor_state) VALUES (?, ?, ?, ?, ?, ?)`;
                con.query(noteQuery, [note_title, subject, note_content, code_content, user_email, editor_state], (error, results) => {
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
app.post("/delete_note", async(req,res) =>{

    let my_query_params = [req.body.noteTitle, req.body.userEmail]
    let my_query = "DELETE FROM notes WHERE note_title = ? AND user_email = ?"

    let results = await executeQuery(req, res, my_query_params, my_query);
    res.send(results);

});

//POST request to upload a new note.
app.post("/upload_note", upload.single('file'), async(req,res) =>{
    let file = req.file;

    const filePath = path.join(__dirname, file.path); //absolute path for the directory (server directory) and the file.path (from multer).

    //reading the uploading file content and sending back all the extracted text. 
    fs.readFile(filePath, async(err, fileContent) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            const pdfData = await pdfParse(fileContent);
            res.send({
                content: pdfData.text, 
                name: file.originalname
            }
            );
        }
    });
}); 

// GET request to route '/get_notes/:subject'
app.get("/get_notes/:subject", (req, res) => {
    
    let subject = req.params.subject;
    let user_email = req.query.email;

    let my_query = `SELECT * FROM notes WHERE note_subject=(?) AND user_email = ?`;
    con.query(my_query, [subject, user_email], (error, results) => {
        if (error) {
            res.status(500).send(error);
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

//GET request to route '/get_total_notes'
app.get("/get_total_notes", (req, res) =>{
    let my_query = 'SELECT COUNT(id) as totalNotes FROM notes'
    con.query(my_query, (error, results) =>{
        if (error) {
            res.status(500).send(error);
        } else {
            res.send({'totalNotes':results[0].totalNotes});
        }
    })
});

