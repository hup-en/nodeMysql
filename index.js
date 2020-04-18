const express = require('express');
const mysql = require("mysql");
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 4400;

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: "",
        password: "",
        database: ""
    }
)

connection.connect(err => {
    if(!err){
        console.log("Connected Successfully.")
    }else {
        console.log("Couldn't Connect." + JSON.stringify(err, undefined, 2))
    }
})

app.get("/allNotes", (req, res) => {
    const SELECT_ALL_NOTES = "SELECT * FROM notes"; 
    connection.query(SELECT_ALL_NOTES, (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
})
})

app.get("/selectById/:id", (req, res) => {
    connection.query("SELECT * FROM notes WHERE id = ?", [req.params.id], (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
})
})


app.get("/deleteById/:id", (req, res) => {
    connection.query("DELETE FROM notes WHERE id = ?", [req.params.id], (err, rows, fields) => {
    if(!err)
        res.send("Deleted Successfully");
    else
        console.log(err);
})
})

app.get("/insertNewNote", (req, res) => {
    // use req.body(paramerters for sql) to get data from client

    INSERT_INTO = "INSERT INTO notes(title, notebody) VALUES('Learn flutter', 'Flutter Intro in edx and have a scratch app.')"; 
    connection.query(INSERT_INTO, (err, results) => {
    if(!err){
        res.send("Data inserted successfully.");
    }else{
        console.log("Coundn't Insert Data." + JSON.stringify(err, undefined, 2));
    }
})
})

app.get("/updateNote/:id", (req, res) => {
    // use req.body(paramerters for sql) to get data from client

    connection.query("UPDATE notes SET title = 'Cool Express' WHERE id = ?", [req.params.id], (err, results) => {
    if(!err){
        res.send("Data Updated successfully.");
    }else{
        console.log("Coundn't Update Data." + JSON.stringify(err, undefined, 2));
    }
})
})

// connection.end();

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));