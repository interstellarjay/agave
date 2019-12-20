#!/usr/bin/env node
const inquirer = require ('inquirer')
const emoji = require ('node-emoji')
const fs = require ('fs')
const Log = require ('./src/Log')
const ProcessFiles = require ('./src/ProcessFiles')
const { TEMPLATE_REACT } = require('./templates/react')
const { TEMPLATE_STORYBOOK } = require('./templates/story')
const { TEMPLATE_JESTENZYME } = require('./templates/jest')
const USING_USER_TEMPLATES = true
const USING_AUTO_TEMPLATES = false
const DEFAULT_TEMPLATE_LIST = [
    { 
        src: TEMPLATE_REACT, 
        path: '%%c%%.tsx'
    },
    {
        src: TEMPLATE_STORYBOOK,
        path: '%%c%%.stories.ts'
    },
    {
        src: TEMPLATE_JESTENZYME,
        path: '%%c%%.test.ts'
    }
]

// Output directory
const OUT_DIR = './out'

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
function createFilesFromTemplate (answers, templatesDir, templateProvider) {
    const cmpList = answers

    cmpList.forEach((cmpNameRoot) => {
        let cmpName = Pascalize(cmpNameRoot)
        const componentNameDirectory = `${OUT_DIR}/${cmpName}`

        // If out directory does NOT exist, create the out directory
        if (!fs.existsSync(OUT_DIR)) {
            fs.mkdirSync(OUT_DIR)
        }

        // If out directory ALREADY exists, show error message
        if (fs.existsSync(componentNameDirectory)) {
            Log.General('bgRed', 'white', `\n./${cmpName}`)
            Log.Error('^ This directory already exists, component names must be unique.')
            return null
        }

        // If out directory does NOT exist, create the out directory
        if (!fs.existsSync(componentNameDirectory)) {
            fs.mkdirSync(componentNameDirectory)
        }

        // Create empty templates array
        let templates = []

        // Populate each template
        if (templateProvider === USING_AUTO_TEMPLATES) {
            Log.Info('Using default templates')
        }
        
        templatesDir.map((template) => {
            let populatedTemplate = template.src.replace(/%%c%%/g, cmpName)
            let populatedFilePath = template.path.replace(/%%c%%/g, cmpName)
            return templates.push({
                src: populatedTemplate,
                path: populatedFilePath
            })
        })
   
        // Create component files from templates
        templates.map((template) => {
            fs.appendFile(`${OUT_DIR}/${cmpName}/${template.path}`, `${template.src}`, function (err) {
                if (err) throw err
                Log.General('bgBlack','greenBright',`${emoji.get('herb')} ${template.path}`)
                Log.Success()
            }) 
        })
    })
    return 0
}

// Check for config args
function processArgs (args) {

    // User did not provide args
    const NO_ARGS_ENTERED = false

    // Separate config arg from other args
    let argList = args || []
    let configArg = []

    // If no arguments, return false
    if (!args || args.length <= 0) {
        return NO_ARGS_ENTERED
    }
    
    // Isolate config argument from other args
    args.filter((item, index) => {
        if (/config\=/gi.test(item)){
            let pathURI = item
            let parsedPath = pathURI.split(/config\=/gi)[1]
            parsedPath = parsedPath.replace('~','//')
            argList.pop(index)
            return configArg = parsedPath
        }
        return
    }) || []

    // Return the arguments
    let params = {
        components:     { 
            values: argList.length > 0 ? argList : NO_ARGS_ENTERED,
        },
        templatePath:   {
            values: configArg.length > 0 ? configArg : NO_ARGS_ENTERED,
        },
        fileData: []
    }

    // Parse all template files 
    let templateFilesInDirectory 
    if (configArg.length > 0){
        templateFilesInDirectory = fs.readdirSync(params.templatePath.values) || NO_ARGS_ENTERED
        ProcessFiles(params.fileData, params.templatePath.values)
    }

    // Return the parsed form of the arguments Agave CLI was called with
    return params
}


// Start the application
function Main () {
    // Show Agave logo
    Log.Logo()

    // Check for component arg
    let componentList = process.argv.slice(2)
    let options = processArgs(componentList)

    // Template and files
    let templatesOrigin = options.templatePath && options.templatePath.values ? options.templatePath.values : DEFAULT_TEMPLATE_LIST
    let filesOrigin = options.fileData ? options.fileData : false

    // If a templates directory was NOT passed
    Log.Info(`Processing ... `)

    // If arguments NOT passed to CLI
    if (!options){
        Log.Info('No CLI arguments passed')
        return inquirer
            .prompt(questions)
            .then((answers) => {
                let answerList = answers[questions[0].name].split(' ') 
                return createFilesFromTemplate(answerList, templatesOrigin, USING_AUTO_TEMPLATES)
            })
    }

    // If ONLY the COMPONENT NAMES were passed as arguments
    if (!options.templatePath.values && options.components.values){
        return createFilesFromTemplate(options.components.values, templatesOrigin, USING_AUTO_TEMPLATES)
    }

    // If ONLY the TEMPLATE DIRECTORY was passed as arguments
    if (!options.components.values && options.templatePath.values){
        return inquirer
            .prompt(questions)
            .then((answers) => {
                let answerList = answers[questions[0].name].split(' ') 
                return createFilesFromTemplate(answerList, filesOrigin, USING_AUTO_TEMPLATES)
            })
    }

    // If BOTH TEMPLATES and COMPONENT NAMES were passed as arguments
    return createFilesFromTemplate(options.components.values, filesOrigin, USING_USER_TEMPLATES)
}

// Run
Main()

