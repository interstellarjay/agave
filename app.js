#!/usr/bin/env node
const inquirer = require ('inquirer')
const emoji = require ('node-emoji')
const fs = require ('fs')
const Log = require ('./src/Log')

// Templates
const { TEMPLATE_REACT } = require('./templates/react')
const { TEMPLATE_STORYBOOK } = require('./templates/story')
const { TEMPLATE_JESTENZYME } = require('./templates/jest')
const templateList = [
    { 
        src: TEMPLATE_REACT, 
        ext: '.tsx'
    },
    {
        src: TEMPLATE_STORYBOOK,
        ext: '.stories.ts'
    },
    {
        src: TEMPLATE_JESTENZYME,
        ext: '.test.ts'
    }
]

// Output directory
const OUT_DIR = './'

// CLI Questions
const questions = [
    {
        type: 'string',
        name: 'componentNames',
        message: `Please write your list of components separated by spaces.\n ${emoji.get('honey_pot')}${emoji.get('herb')}  What are the names of your components?\n`
    },
]

// Capitalize the first letter of each component
function Pascalize (cmp) {
    let pascalizedName = cmp.split('')
    let firstLetter = pascalizedName[0].toUpperCase()
    pascalizedName.shift(0)
    pascalizedName = firstLetter + pascalizedName.join('')
    return pascalizedName
}


// Generate the files
function createFilesFromTemplate (answers, templatesDir) {
    const cmpList = answers

    console.log('cmp', cmpList)

    cmpList.forEach((cmpNameRoot) => {
        let cmpName = Pascalize(cmpNameRoot)
        const componentNameDirectory = `${OUT_DIR}/${cmpName}`

        // Show error message 
        if (fs.existsSync(componentNameDirectory)) {
            Log.General('bgRed', 'white', `\n./${cmpName}`)
            Log.Error('^ This directory already exists, component names must be unique.')
            return null
        }

        // Create empty templates array
        let templates = []

        // Populate each template
        if (!templatesDir || templatesDir.length < 1) {
            Log.Info('Using default templates')
            templateList.map((element) => {
                let populatedTemplate = element.src.replace(/%%_CMP_%%/g, cmpName)
                templates.push({
                    src: populatedTemplate,
                    ext: element.ext
                })
            })
        }
        if (templatesDir > 0) {
            templatesDir.map((element) => {
                // let populatedTemplate = element.src.replace(/%%_CMP_%%/g, cmpName)
                // templates.push({
                //     src: populatedTemplate,
                //     ext: element.ext
                // })
                return console.log(element);
            })
        }

        // Create component nested directory
        fs.mkdirSync(componentNameDirectory)
        
        // Create component files from templates
        templates.map((template) => {
            fs.appendFile(`${OUT_DIR}/${cmpName}/${cmpName}${template.ext}`, `${template.src}`, function (err) {
                if (err) throw err
                Log.General('bgBlack','greenBright',`${emoji.get('herb')} ${cmpName}${template.ext}`)
                Log.Success()
            }) 
        })
    })
    return 0
}

// Check for config args
function checkForConfigArg (argList) {

    console.log(argList)
    return
    // Separate config arg from other args
    let configArg = []; 
    argList.find((item) => {
        if (/config\=/gi.test(item)){
            configArg = argList.shift(item)
            let pathArray = configArg.split(/=/g);
            pathArray.shift(0)
            pathArray = pathArray.pop()
            pathArray = pathArray.replace('~','//')
            configArg = pathArray
            return [configArg]
        }
        return 
    })

    // User did not provide args
    const NO_ARGS_ENTERED = false;

    // All the arguments Agave CLI was called with
    const params = {
        components:     { 
            values: argList.length > 0 ? argList : NO_ARGS_ENTERED,
        },
        templatePath:   { 
            values: configArg.length > 0 ? configArg : NO_ARGS_ENTERED,
        },
    }

    console.log(params)
    return params

    // // Templates
    // const templateDirectory = fs.readdirSync(pathArray);
    // return templateDirectory
}


// Start the application
function Main () {
    
    // Show Agave logo
    Log.Logo()

    // Check for component arg
    let componentList = process.argv.slice(2)
    const templatesOrigin = checkForConfigArg(componentList).templatePath.values;
    
    // If a templates directory was passed
    if (!templatesOrigin){
        templatesOrigin = templateList
        Log.Info('Using default directory')
    }

    Log.Info(`Using templates directory: "${templatesOrigin}"`)

    // If no component names were passed as arguments
    if (!checkForConfigArg(componentList).components.values){
        Log.Info('No component arguments passed')
        return inquirer
            .prompt(questions)
            .then((answers) => {
                let answerList = answers[questions[0].name].split(' ') 
                return createFilesFromTemplate(answerList, templatePath)
            })
    }
 
    return createFilesFromTemplate(componentList, templatePath)
}

// Run
Main()

