const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const { func } = require("prop-types");

const asyncFile = util.promisify(fs.writeFile);

const employeeCards = [];
let employeeCardsStr;

function newEmployee(){
    inquirer.prompt([
        {
            type: "list",
            message: "What's your role?",
            name: "role",
            choices: ["Manager","Engineer","Intern"]
          },
          {
            type: "input",
            message: "What is your Name?",
            name: "name"
          },
          {
            type: "input",
            message: "What is your Id?",
            name: "id"
          },
          {
            type: "input",
            message: "What is your Email?",
            name: "email"
          }
    ])

    .then(function(primaryAnswer){
        if(primaryAnswer.role === "Manager"){
            managerInfo(primaryAnswer)
        }else if(primaryAnswer.role ==="Engineer"){
            engineerInfo(primaryAnswer)
        }else if(primaryAnswer.role === "intern"){
            internInfo(primaryAnswer)
        }
    })
    .catch(function(err){
        console.log(err);
    })
}