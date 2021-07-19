//Cost declarations
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors')

//Cors init
app.use(cors());
app.use(express.json());

//Server Connection *Modify this to match your mysql database or use the database included in the project*
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "employee-system",
});

//Post method to get data from the input
app.post('/create', (req, res) =>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const salary = req.body.salary;

    db.query('INSERT INTO employees (name, age, country, position, salary) VALUES (?,?,?,?,?)',
    [name, age, country, position, salary],
    (err, result) =>{
        if (err) {
            console.log(err)
        }else{
            res.send("Values Inserted");
        }
    }
    );
});

//Get method to get data from the database
app.get('/employees', (req,res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

//Put method to update database
app.put("/update", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const salary = req.body.salary;
    db.query(
        "UPDATE employees SET name = ?, age = ?, country = ?, position = ?, salary = ?   WHERE id = ?",
        [name,age,country,position,salary, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//Delete method
app.delete('/delete/:id', (req, res) =>{
    const id = req.params.id
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen(3001, ()=> {
    console.log('Server is running...')
})