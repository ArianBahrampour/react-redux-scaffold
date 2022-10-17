'use strict'
const inquirer  = require('./inquirer');
const dir  = require('./dir');
const files  = require('./files');
const chalk  = require('chalk');

module.exports = {
    handle : async () => {
        let data;
        data = await inquirer.getRestReduxData();
        dir.handleDirectories();
        console.log(chalk.green.bold("✓ redux files structure is ok!"))
        files.createStoreFileIfNotExists();
        files.createDefaultReducerFileIfNotExists();
        files.createRootReducerFileIfNotExists();
        files.createActionFileIfNotExists(data.action,data.func);
        files.createReducerFileIfNotExists(data.action,data.func);
        // check directories and create if not exists
        // check files and create if not exists
    }
}