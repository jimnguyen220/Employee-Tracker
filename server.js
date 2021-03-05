//Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

//parameters for connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'
});

//create connection
connection.connect((err)=>{
    if (err) throw err;
    console.log("Connected!");
    //add functions here that happen when connected


});


/////////////////////////////////////////////////////

