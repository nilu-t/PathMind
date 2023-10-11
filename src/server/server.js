
const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors');

const dbDetails = require("../database/dbConfig")(); //importing the function from dbConfig.js

const PORT = 8000

app.use(express.json()); //middleware required for accessing post data.
app.use(cors()); // Enable CORS for all routes

//creating the mysql connection object. 
var con = mysql.createConnection({
    host: dbDetails.host,
    user: dbDetails.user,
    password: dbDetails.password,
    database: dbDetails.database
})

//connecting to the database.
con.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log(`Successfully connected to the ${dbDetails.database} database`)
    }
})

//setting up app listening for port.
app.listen(PORT, (error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log(`Successful app listening on Port: ${PORT}`)
    }
});

//get request to route 'learning_paths'
app.get("/learning_paths", (req, res)=>{
    con.query("SELECT * FROM learning_paths", (error, results)=>{
        if(error){
            res.send(error)
        }
        else{
            res.send(results)
        }
    });
});

//post request to route '/add_note/:subject/:note_title/:note'. The purpose of this function is to add a note for a subject in the notes table. 
app.post("/add_note/:subject/:note_title/:note", (req,res)=>{
    let subject = req.params.subject
    let note = req.params.note
    let note_title = req.params.note_title

    //insert notes data into the notes table. 
    let my_query = `INSERT INTO notes (note_title, note_subject, note_description) VALUES (?, ?, ?)`
    con.query(my_query, [note_title, subject, note], (error,results)=>{
        if(error){
            res.send(error)
        }
        else{
            //get all the notes data from the notes table for viewing purposes.
            con.query("SELECT * FROM notes", (error,results)=>{
                if(error){
                    res.send(error)
                }
                else{
                    res.send(results)
                }
            })
        }
    })
});

//get request to route '/get_note/s:subject'. The purpose of this function is to get ALL notes for a subject in the notes table.
app.get("/get_notes/:subject", (req,res)=>{
    let subject = req.params.subject

    let my_query = `SELECT * FROM notes WHERE note_subject= (?)`
    con.query(my_query, [subject], (error, results)=>{
        if(error){
            res.send(error)
        }
        else{
            res.send(results)
        }
    })

})