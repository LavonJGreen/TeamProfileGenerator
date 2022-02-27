const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

const asyncFiles = util.promisify(fs.writeFile);

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

function managerInfo(responses){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your office number",
            name: "officeNumber"
        }
    ])
    .then(function(office){
        const manager = new Manager (responses.name, responses.id, responses.email, office.officeNumber)
        employeeCards.push(manager.appendHtml());
        nextEmployee();
    })
}

function engineerInfo(responses){
    inquirer.prompt([
        {
          type: "input",
          message: "What is your github username?",
          name: "gitName"
        }
      ]).then(function(gitName){
        
        const engineer = new Engineer (responses.name, responses.id, responses.email, gitName.gitName)
        employeeCards.push(engineer.appendHtml()); 
        nextEmployee();
    })
  }

  function internInfo(responses){
    inquirer.prompt([
        {
          type: "input",
          message: "What school does the intern attend?",
          name: "school"
        }
      ]).then(function(school){
        // Create new inter from class
        const intern = new Intern (responses.name, responses.id, responses.email, school.school)
        employeeCards.push(intern.appendHtml());
        nextEmployee();
      })
  }

  function nextEmployee(){
    inquirer.prompt([
      {
        type: "list",
          message: "Would you like to add another employee?",
          name: "addNext",
          choices: [
            "yes",
            "no",
          ]
      }
    ]).then(function(response){
  if (response.addNext === "yes") {
    newEmployee();
  } else {
    employeeCardsStr = employeeCards.join("");
    generateHTML();
  };
    });
  };

  function generateHTML() {}