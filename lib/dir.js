const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    },
    confirmCurrentDirectory : () => {
        const questions = [
            {
                name : 'current',
                type : 'confirm',
                message : 'Are you sure to create needed file in current directory?'
            }
        ];
        return inquirer.prompt(questions);
    },
    handleDirectories : () => {
        module.exports.createReduxDirectoryIfNotExists();
        module.exports.createReduxActionsDirectoryIfNotExists();
        module.exports.createReduxReducersDirectoryIfNotExists();
        module.exports.createReduxStoreDirectoryIfNotExists();
    },
    createReduxDirectoryIfNotExists : () => {
        let exists = module.exports.directoryExists('redux');
        if (exists)
            return true;
        return fs.mkdirSync('redux')
    },
    createReduxActionsDirectoryIfNotExists : () => {
        let exists = module.exports.directoryExists('redux/actions');
        if (exists)
            return true;
        return fs.mkdirSync('redux/actions')
    },
    createReduxReducersDirectoryIfNotExists : () => {
        let exists = module.exports.directoryExists('redux/reducers');
        if (exists)
            return true;
        return fs.mkdirSync('redux/reducers')
    },
    createReduxStoreDirectoryIfNotExists : () => {
        let exists = module.exports.directoryExists('redux/store');
        if (exists)
            return true;
        return fs.mkdirSync('redux/store')
    }
}