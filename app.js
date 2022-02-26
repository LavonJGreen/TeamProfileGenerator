const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const asyncFile = 

async function prompt(){
    try{
        const inquirerRes = await inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?: "
           },
           {
                type: "input",
                name: "id",
                message: "Enter your ID: "
           },
           {
                type: "input",
                name: "managerEmail",
                message: "Enter your email address: "
           }
        ]);
        console.log(inquirerRes.email)
    }
    catch(err){
        
    }
};