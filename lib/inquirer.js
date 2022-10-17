const inquirer = require('inquirer');

module.exports = {
    getGlobalActionType: () => {
        const questions = [
            {
                name: 'type',
                type: 'rawlist',
                choices: [ "simple", "rest" ],
                message: 'Select the action type (check package github page) :'
            }
        ];
        return inquirer.prompt(questions);
    },
    getRestReduxData: () => {
        const questions = [
            {
                name: 'action',
                type: 'input',
                message: 'Enter your rest redux action (example: GET_USERS_LIST) :',
                validate : function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter rest redux action.';
                    }
                }
            },
            {
                name: 'func',
                type: 'input',
                message: 'Enter your rest redux function name (example: getUsersList) :',
                validate : function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter rest redux function name.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }
};