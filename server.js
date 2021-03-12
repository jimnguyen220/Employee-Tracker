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
    console.log("Welcome to the Employee Tracker!");
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
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add an Employee", "Add a Department", "Add a Role", "Update an Employee", "Remove Employee", "Quit App"]
        },

    ]).then((data) => {
        if (data.prompt === "View All Employees") {
            showTeam();
        } else if (data.prompt === "View All Departments") {
            showDepartments();
        } else if (data.prompt === "View All Roles") {
            showRoles();
        } else if (data.prompt === "Add an Employee") {
            getTitle();
        } else if (data.prompt === "Add a Department") {
            addDepartment();
        } else if (data.prompt === "Add a Role") {
            getDeptArray();
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

//removed this as an option as this is not a requirement for app//
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
//////////////////////////////////////////////////////////////////
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

function addDepartment (){
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department you would like to add?"
        },
    ]).then((data)=>{
        const query = connection.query(
            "INSERT INTO department SET ?",
            {   
                department_name: `${data.department}`,
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Department Added!");
                startInquirer();
            }
        )  
    })
}
///////////////////////////////////////////////////////////////////////////
function getDeptArray () {
    let sql =  
    `SELECT department_id, department_name FROM department`;

    connection.query(sql, function (err, res){
        if (err) throw err;
        // console.log(res);        
        const deptArray = [];
        const deptId = [];
        for (let i = 0; i < res.length; i++) {
            deptArray.push(res[i].department_name)
            deptId.push(res[i].department_id)
        }

        addRole(deptArray, deptId)

    })
}
///////////////////////////////////////////////////////
function addRole (deptArray, deptId) {

    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What role would you like to create?"
        },
        {
            type: "list",
            name: "department",
            message: "Which department is it under?",
            choices: deptArray
        },
        {
            type: "input",
            name: "salary",
            message: "What is the annual salary for this position?",
        },
    ]).then((data)=>{

        let idNum;
        deptArray.forEach((deptName, index) =>{
            const dept = deptId[index];
            // console.log (deptName, dept);

            if (deptName === `${data.department}`){
                idNum = dept;
            }

        })

        const query = connection.query(
            "INSERT INTO role SET ?",
            {   
                title: `${data.role}`,
                salary: `${data.salary}`,
                department_id: `${idNum}`

            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Role Added!");
                startInquirer();
            }
        )  
    })
}
///////////////////////////////////////////////////////

function getTitle () {
    let sql =  
    `SELECT role_id, title FROM role`;

    connection.query(sql, function (err, res){
        if (err) throw err;
        // console.log(res);        
        const jobTitle = [];
        const idRole = [];
        for (let i = 0; i < res.length; i++) {
            jobTitle.push(res[i].title)
            idRole.push(res[i].role_id)
        }

        // console.log (jobTitle)
        createEmployee (jobTitle, idRole)

    })
}


function createEmployee(jobTitle, idRole) {
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
            choices: jobTitle
        },
    ]).then((data) => {

        let roleid;
        jobTitle.forEach((jobTitle, index) =>{
            const role = idRole[index];

            if (jobTitle === `${data.role}`){
                roleid = role;
            }

        })
  
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
    `SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary, role.role_id
     FROM employee INNER JOIN role 
     ON employee.role_id = role.role_id 
     INNER JOIN department 
     ON role.department_id = department.department_id;`;

    connection.query(sql, function (err, res){
        if (err) throw err;
        // console.log(res);        
        const nameArray = [];
        const roleArray = [];
        const roleid = [];
        for (let i = 0; i < res.length; i++) {
            nameArray.push(res[i].first_name +" "+res[i].last_name)
            roleArray.push(res[i].title)
            roleid.push(res[i].role_id)
        }
        employeeChange(nameArray, roleArray, roleid);
    })
}


function employeeChange(nameArray, roleArray, roleid) {
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
            updateEmployee(numId, roleArray, roleid)
        })
    })
};

function updateEmployee (numId, roleArray, roleid) {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is the employee's new role?",
            choices: roleArray
        }
    ]).then((data) => {
        let newId;

        roleArray.forEach((array, index) =>{
            const num2 = roleid[index];
            // console.log(array)
            // console.log(num2)
            if (array === `${data.role}`){
                newId = num2;
            }
        })
        // console.log(newId);
        const query = connection.query(
        "UPDATE employee SET ? WHERE ?",
            [
                {
                    role_id: `${newId}`
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
    
};

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