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
        }else if(primaryAnswer.role === "Intern"){
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
          name: "university"
        }
      ]).then(function(univeristy){
       
        const intern = new Intern (responses.name, responses.id, responses.email, univeristy.univeristy)
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

  function generateHTML() {
    const html =
    `<!doctype html>
<html lang= "en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<title>Developer Profile</title>
</head>
<body>
<div class="container">
  <div class="jubotron" style="background-color: black; height: 100vh;">
  <center><h1 class="display-4" style="margin: 50px">My Team Roster</h1></center>
    <div class="row d-flex justify-content-around">
    ${employeeCardsStr}
    </div>
  </div>
</div>
<script
  src="https://code.jquery.com/jquery-3.6.0.slim.js"
  integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY="
  crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
</body>
</html>`
asyncFiles('index.html', html, 'UTF-8');
};


newEmployee();
