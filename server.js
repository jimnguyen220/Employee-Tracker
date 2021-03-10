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
        choices: ["View All Employees", "View Employees by Department", "View All Departments", "View All Roles", "Add an Employee", "Add a Department", "Add a Role", "Update an Employee", "Remove Employee", "Quit App"]
        },

    ]).then((data) => {
        if (data.prompt === "View All Employees") {
            showTeam();
        } else if (data.prompt === "View Employees by Department") {
            employeeByDepartment();
        } else if (data.prompt === "View All Departments") {
            showDepartments();
        } else if (data.prompt === "View All Roles") {
            showRoles();
        } else if (data.prompt === "Add an Employee") {
            createEmployee();
        } else if (data.prompt === "Add a Department") {

        } else if (data.prompt === "Add a Role") {

        } else if (data.prompt === "Update an Employee") {
            employeeName();
        } else if (data.prompt === "Remove Employee") {
            employeeRemove();
        } else {
            console.log("Goodbye!")
        }
        
    })
};
//////////////////////////////////////////////////////////////////////////////////////

function showTeam () {
    let sql =  
    `SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary 
     FROM employee INNER JOIN role 
     ON employee.role_id = role.role_id 
     INNER JOIN department 
     ON role.department_id = department.department_id;`

    connection.query(sql, function (err, res){
        if (err) throw err;
        // console.log(res);
        console.table('All Company Employees', res);
        startInquirer();
    })
};

function employeeByDepartment () {
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
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary 
             FROM employee 
             INNER JOIN role 
             ON employee.role_id = role.role_id 
             INNER JOIN department 
             ON role.department_id = department.department_id 
             WHERE department_name = "${department}"`;

            connection.query(sql, function (err, res){
                if (err) throw err;
                // console.log(res);
                console.table(`${department} Team Employees`, res);
                startInquirer();
        })
    })
};

function showDepartments() {
    let sql =  
    `SELECT department_name 'Departments'
     FROM department;`

    connection.query(sql, function (err, res){
        if (err) throw err;
        // console.log(res);
        console.table('  ', res);
        startInquirer();
    })
};

function showRoles() {
    let sql =  
    `SELECT title 'Job titles'
     FROM role;`

    connection.query(sql, function (err, res){
        if (err) throw err;
        // console.log(res);
        console.table('  ', res);
        startInquirer();
    })
};


//////////////////////////////////////////////////////////////////////////////////////

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
            name: "role",
            message: "What is the employees role with the company?",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"]
        },
    ]).then((data) => {

        let roleid;

        switch(data.role) {
            case "Sales Lead":
                roleid = 1;
                break;
            case "Salesperson" :
                roleid = 2;
                break;
            case "Lead Engineer" :
                roleid = 3;
                break;
            case "Software Engineer" :
                roleid = 4;
                break;
            case "Accountant" :
                roleid = 5;
                break;
            case "Legal Team Lead" :
                roleid = 6;
                break;
            case "Lawyer" :
                roleid = 7;
                break;
        }
   
        const query = connection.query(
            "INSERT INTO employee SET ?",
            {   
                id: `${data.id}`,
                first_name: `${data.first}`,
                last_name: `${data.last}`,
                role_id: `${roleid}`
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Employee Added!");
                startInquirer();
            }
        )       
    })
};

//////////////////////////////////////////////////////////////////////////////////////
///                         UPDATES EMPLOYEE ROLE                                 ///
////////////////////////////////////////////////////////////////////////////////////
function employeeName () {
    let sql =  
    `SELECT id, first_name, last_name FROM employee`;

    connection.query(sql, function (err, res){
        if (err) throw err;
        // console.log(res);        
        const nameArray = [];
        for (let i = 0; i < res.length; i++) {
            nameArray.push(res[i].first_name +" "+res[i].last_name)
        }
        employeeChange(nameArray);
    })
}


function employeeChange(nameArray) {
    inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "Which Employee would you like to update?",
            choices: nameArray
        },
    ]).then((data) =>{
        
        let empId = 
        `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) LIKE '${data.name}'`

        connection.query(empId, function (err, res){
            if (err) throw err;
            const numId = parseInt((res[0].id))
            updateEmployee(numId)
        })

    
    })
};

function updateEmployee (numId) {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is that employees new role?",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"]
        }
    ]).then((data) =>{
        let roleid;

        switch(data.role) {
            case "Sales Lead":
                roleid = 1;
                break;
            case "Salesperson" :
                roleid = 2;
                break;
            case "Lead Engineer" :
                roleid = 3;
                break;
            case "Software Engineer" :
                roleid = 4;
                break;
            case "Accountant" :
                roleid = 5;
                break;
            case "Legal Team Lead" :
                roleid = 6;
                break;
            case "Lawyer" :
                roleid = 7;
                break;
        }
        const query = connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
                {
                    role_id: `${roleid}`
                },
                {
                    id: `${numId}`
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log("Employee updated")
                startInquirer();
            }
        )
    })
}

//////////////////////////////////////////////////////////////////////////////////////
///                         Removes Employee                                      ///
////////////////////////////////////////////////////////////////////////////////////
function employeeRemove () {
    let sql =  
    `SELECT id, first_name, last_name FROM employee`;

    connection.query(sql, function (err, res){
        if (err) throw err;
        // console.log(res);        
        const nameArray = [];
        for (let i = 0; i < res.length; i++) {
            nameArray.push(res[i].first_name +" "+res[i].last_name)
        }
        employeeDelete(nameArray);
    })
}

function employeeDelete(nameArray) {
    inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "Which Employee would you like to remove?",
            choices: nameArray
        },
    ]).then((data) =>{
        
        let empId = 
        `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) LIKE '${data.name}'`

        connection.query(empId, function (err, res){
            if (err) throw err;
            const numId = parseInt((res[0].id))
            deleteEmployee(numId)
        })

    
    })
};

function deleteEmployee(numId) {
    connection.query(
        "DELETE FROM employee WHERE ?",
        {
            id: `${numId}`
        },
        function (err, res) {
            if (err) throw (err);
            console.log("Employee removed");
            startInquirer();
        }
    )
}