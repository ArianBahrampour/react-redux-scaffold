const fs = require('fs');
const chalk = require('chalk');
const dir = require('./dir');
const codes = require('./../dist/codes')
module.exports = {
    createStoreFileIfNotExists : () => {
        fs.access('./redux/store/store.js', fs.constants.F_OK, (err) => {
            if (err) {
                fs.writeFile('./redux/store/store.js',codes.store,(error) => {
                    if (error) {
                        console.log(chalk.red("ERROR CREATING FILE store.js"));
                        return;
                    }
                    console.log(chalk.green.bold("✓ store file created!"))
                });
            }else{
                console.log(chalk.green.bold("✓ store file exists!"))
            }
        });
    },
    createDefaultReducerFileIfNotExists : () => {
        fs.access('./redux/reducers/default.js', fs.constants.F_OK, (err) => {
            if (err) {
                fs.writeFile('./redux/reducers/default.js',codes.default_reducer,(error) => {
                    if (error) {
                        console.log(chalk.red("ERROR CREATING DEFAULT REDUCER"));
                        return;
                    }
                    console.log(chalk.green.bold("✓ default reducer file created!"))
                });
            }else{
                console.log(chalk.green.bold("✓ default reducer file exists!"))
            }
        });
    },
    createRootReducerFileIfNotExists : () => {
        fs.access('./redux/reducers/index.js', fs.constants.F_OK, (err) => {
            if (err) {
                fs.writeFile('./redux/reducers/index.js',codes.root_reducer,(error) => {
                    if (error) {
                        console.log(chalk.red("ERROR CREATING FILE root reducer"));
                        return;
                    }
                    console.log(chalk.green.bold("✓ root reducer file created!"))
                });
            }else{
                console.log(chalk.green.bold("✓ root reducer exists!"))
            }
        });
    },
    createActionFileIfNotExists : (action_name,method_name) => {
        let file_name = method_name.charAt(0).toUpperCase() + method_name.slice(1)+'Actions.js';
        fs.access('./redux/actions/'+file_name, fs.constants.F_OK, (err) => {
            if (err) {
                fs.writeFile('./redux/actions/'+file_name,module.exports.getActionFileTemplate(action_name,method_name),(error) => {
                    if (error) {
                        console.log(chalk.red("ERROR CREATING FILE store.js"));
                        return;
                    }
                    console.log(chalk.green.bold("✓ action file created!"))
                });
            }else{
                console.log(chalk.green.bold("✓ action file exists!"))
            }
        });
    },
    createReducerFileIfNotExists : (action_name,method_name) => {
        let file_name = method_name.charAt(0).toUpperCase() + method_name.slice(1)+'Reducer.js';
        fs.access('./redux/reducers/'+file_name, fs.constants.F_OK, (err) => {
            if (err) {
                fs.writeFile('./redux/reducers/'+file_name,module.exports.getReducerFileTemplate(action_name,method_name),(error) => {
                    if (error) {
                        console.log(chalk.red("ERROR CREATING REDUCER FILE!"));
                        return;
                    }
                    console.log(chalk.green.bold("✓ reducer file created!"))
                });
            }else{
                console.log(chalk.green.bold("✓ reducer file exists!"))
            }
            fs.readFile('./redux/reducers/index.js', 'utf8', function(err, content) {
                if (err) {
                    // handle error
                }
                new_content = content.replace("defaultReducer,","defaultReducer,"+"\n"+"\t"+method_name+'Reducer,');
                import_phrase = "import "+method_name+"Reducer from './"+file_name+"';";
                new_content = new_content.replace("import defaultReducer from './default';","import defaultReducer from './default';\n"+import_phrase);
                fs.writeFile('./redux/reducers/index.js',new_content,(error) => {
                    if (error) {
                        console.log(chalk.red("ERROR UPDATING ROOT REDUCER FILE!"));
                        return;
                    }
                    console.log(chalk.green.bold("✓ root reducer file updated!"))
                });
            });
        });
    },
    getActionFileTemplate : (action_name,method_name) => {
        action_name = action_name.toUpperCase();
        let action_key  = action_name.toLowerCase();
        let action_code = codes.action;
        action_code     = action_code.split("{ACTION_NAME}").join(action_name);
        action_code     = action_code.split("{ACTION_METHOD}").join(method_name);
        action_code     = action_code.split("{ACTION_KEY}").join(action_key);
        return action_code;
    },
    getReducerFileTemplate : (action_name,method_name) => {
        action_name = action_name.toUpperCase();
        let file_name = method_name.charAt(0).toUpperCase() + method_name.slice(1)+'Actions.js'
        let action_key  = action_name.toLowerCase();
        let action_code = codes.reducer;
        action_code     = action_code.split("{ACTION_NAME}").join(action_name);
        action_code     = action_code.split("{METHOD_NAME}").join(method_name);
        action_code     = action_code.split("{FILE_NAME}").join(file_name);
        action_code     = action_code.split("{ACTION_KEY}").join(action_key);
        return action_code;
    }
}