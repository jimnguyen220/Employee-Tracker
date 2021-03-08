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
        choices: ["Display All Employees", "Display Employees by Department", "Display Employees by Manager", "Add a Team Member", "Delete Team Member"]
        },

    ]).then((data) => {
        if (data.prompt === "Display All Employees") {
            showTeam();
        } else if (data.prompt === "Display Employees by Department") {
            inquirer.prompt([
                {
                    type: "list",
                    name: "department",
                    message: "What department would you like to see?",
                    choices: ["Sales", "Engineering", "Finance", "Legal"]
                }
            ]).then((response) => {
                let department = response.department;
                if (department === "Sales") {
                    showDepartment(department);
                } else if (department === "Engineering") {
                    showDepartment(department);
                } else if (department === "Finance") {
                    showDepartment(department);
                } else if (department === "Legal") {
                    showDepartment(department);
                } 
            })

        } else if (data.prompt === "Display Employees by Manager") {

        } else if (data.prompt === "Delete Team Member") {

        } else if (data.prompt === "Add a Team Member") {
        
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

function showDepartment (department) {
    let sql = 
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee INNER JOIN role ON employee.role_id = role.role_id INNER JOIN department ON role.department_id = department.department_id WHERE department.department_name = "${department}"`;

    connection.query(sql, function (err, res){
        if (err) throw err;
        // console.log(res);
        console.table(`${department} Team Employees`, res);
        startInquirer();
    })
};

////////////////////////////////////////////////////////

