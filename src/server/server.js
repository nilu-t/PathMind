
const express = require('express')
const app = express()
const mysql = require('mysql2')

const dbDetails = require("../database/dbConfig")(); //importing the function from dbConfig.js

const PORT = 8000

app.use(express.json()); //middleware required for accessing post data.


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

//post request to route '/add_note/:subject/:note'. The purpose of this function is to add a note for a subject in the notes table. 
app.post("/add_note/:subject/:note", (req,res)=>{
    let subject = req.params.subject
    let note = req.params.note

    //insert notes data into the notes table. 
    let my_query = `INSERT INTO notes (note_subject, note_description) VALUES (?, ?)`
    con.query(my_query, [subject, note], (error,results)=>{
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