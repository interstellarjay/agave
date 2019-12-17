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

// Template wildcard
const templateWildcard = `%%_CMP_%%`;

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
            templateList.map((template) => {
                let populatedTemplate = template.src.replace(/%%_CMP_%%/g, cmpName)
                let populatedFilePath = template.path.replace(/%%_CMP_%%/g, cmpName)
                templates.push({
                    src: populatedTemplate,
                    path: populatedFilePath
                })
            })
        }
        if (templatesDir.length > 0) {
            templatesDir.map((template) => {
                let populatedTemplate = template.src.replace(/%%_CMP_%%/g, cmpName)
                let populatedFilePath = template.path.replace(/%%_CMP_%%/g, cmpName)
                return templates.push({
                    src: populatedTemplate,
                    path: populatedFilePath
                })
            })
        }

        console.log('templates', templates)
        // Create component nested directory
        fs.mkdirSync(componentNameDirectory)

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
function checkForConfigArg (args) {

    // User did not provide args
    const NO_ARGS_ENTERED = false

    // Separate config arg from other args
    let argList = args || []
    let configArg = []
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

    // Get all the template file data
    let templateFilesInDirectory = fs.readdirSync(params.templatePath.values) || NO_ARGS_ENTERED
    console.log('templateFiles', templateFilesInDirectory)
    if (templateFilesInDirectory) {
        templateFilesInDirectory.map((fileData)=> {
            const absolutePath = `${params.templatePath.values}/${fileData}`
            const filePath = `${fileData}`
            const file = fs.readFileSync(absolutePath, 'utf8')
            params.fileData.push({
                src: file,
                path: filePath
            })
        })
    }
    // All the arguments Agave CLI was called with
    return params
}


// Start the application
function Main () {
    // Show Agave logo
    Log.Logo()

    // Check for component arg
    let componentList = process.argv.slice(2)
    let options = checkForConfigArg(componentList)
    let templatesOrigin = options.templatePath.values
    let filesOrigin = options.fileData
    
    // If a templates directory was passed
    if (templatesOrigin){
        Log.Info(`Using templates directory: ${JSON.stringify(templatesOrigin)}`)
    }
    // If a templates directory was NOT passed
    if (!templatesOrigin){
        templatesOrigin = templateList
        Log.Info('Using default directory')
    }
    // // If component names were NOT passed as arguments
    // if (!checkForConfigArg(componentList).components.values){
    //     Log.Info('No component arguments passed')
    //     return inquirer
    //         .prompt(questions)
    //         .then((answers) => {
    //             let answerList = answers[questions[0].name].split(' ') 
    //             return createFilesFromTemplate(answerList, templatesOrigin)
    //         })
    // }
    return createFilesFromTemplate(componentList, filesOrigin)
}

// Run
Main()

