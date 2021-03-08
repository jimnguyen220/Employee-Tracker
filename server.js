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
    startInquirer();

});


/////////////////////////////////////////////////////

function startInquirer () {
    inquirer.prompt([
        {
        type: "list",
        name: "prompt",
        message: "What would you like to do?",
        choices: ["Display Team", "Add a Team Member", "Delete Team Member"]
        },

    ]).then((data) => {
        if (data.prompt === "Display Team") {
            showTeam();
        } else if (data.prompt === "Add a Team Member") {

        } else if (data.prompt === "Delete Team Member") {

        }
    })
};

///////////////////////////////////////////////////////

function showTeam () {
    let query =  
    "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary FROM employee INNER JOIN role ON employee.role_id = role.role_id INNER JOIN department ON role.department_id = department.department_id";

    connection.query(query, function (err, res){
        if (err) throw err;
        // console.log(res);
        console.table('Company Employees', res);
        startInquirer();
    })
};

////////////////////////////////////////////////////////

