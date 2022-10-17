#!/usr/bin/env node
'use strict'
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer  = require('./lib/inquirer');
const dir  = require('./lib/dir');
const rest  = require('./lib/rest');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('RRME', { horizontalLayout: 'full' })
    )
);

const run = async () => {
    let confirm;
    let type;
    confirm = await dir.confirmCurrentDirectory();
    if (!confirm.current){
        console.log(chalk.red("Process canceled!"));
        return;
    }
    type = await inquirer.getGlobalActionType();
    switch (type.type) {
        case 'simple':
            console.log(chalk.yellow('Coming Soon!'));
            break;
        case 'rest':
            await rest.handle();
            break;
        default:
            console.log(chalk.yellow('Default Selected!'));
    }
};

run();