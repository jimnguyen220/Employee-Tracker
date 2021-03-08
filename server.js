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
        choices: ["Display All Employees", "Display Employees by Department", "Display Employees by Manager", "Add an Employee", "Update an Employee", "Remove Employee"]
        },

    ]).then((data) => {
        if (data.prompt === "Display All Employees") {
            showTeam();
        } else if (data.prompt === "Display Employees by Department") {
            showDepartment();
        } else if (data.prompt === "Display Employees by Manager") {

        } else if (data.prompt === "Add an Employee") {
            createEmployee();

        } else if (data.prompt === "Update an Employee") {
        
        } else if (data.prompt === "Remove Employee") {
        
        } else {

        }
        
    })
};
///////////////////////////////////////////////////////

function showTeam () {
    let sql =  
    `SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary FROM employee INNER JOIN role ON employee.role_id = role.role_id INNER JOIN department ON role.department_id = department.department_id`;

    connection.query(sql, function (err, res){
        if (err) throw err;
        // console.log(res);
        console.table('All Company Employees', res);
        startInquirer();
    })
};

function showDepartment () {
    inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "What department would you like to see?",
            choices: ["Sales", "Engineering", "Finance", "Legal"]
        }
        ]).then((response) => {
            const department = response.department;
            let sql = 
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee INNER JOIN role ON employee.role_id = role.role_id INNER JOIN department ON role.department_id = department.department_id WHERE department_name = "${department}"`;

            connection.query(sql, function (err, res){
                if (err) throw err;
                // console.log(res);
                console.table(`${department} Team Employees`, res);
                startInquirer();
        })
    })
};
////////////////////////////////////////////////////////

function createEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's id number?"
        },
        {
            type: "list",
            name: "department",
            message: "Which department will the employee work in",
            choices: ["Sales", "Engineering", "Finance", "Legal"]
        },
    ]).then((data) => {
        console.log(data);

        //The code below does not work
        var query = connection.query(
            "INSERT INTO employee SET ?",
            {   
                id: `"${data.id}"`,
                first_name: `"${data.first}"`,
                last_name: `"${data.last}"`,
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows);
                // updateEmployee();
            }
        );
    })

}

// function updateEmployee() {
//     var query = connection.query(
//         "UPDATE employee SET ? WHERE ?",
//         [
//             {

//             }
//         ]
//     )
// };