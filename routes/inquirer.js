const inquirer = require('inquirer');

function startInquirer () {
    inquirer.prompt([
        {
        type: "list",
        name: "prompt",
        message: "What would you like to do?",
        choices: ["Display Team", "Add a Team Member", "Delete Team Member"]
        },

    ]).then((data) => {

    })
};


module.exports =  startInquirer;