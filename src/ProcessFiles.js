const fs = require ('fs')

// Go through all the components and create a file
function ProcessFiles (fileArray, templatePath) {
    let templateFilesInDirectory = fs.readdirSync(templatePath) || NO_ARGS_ENTERED
    
    if (templateFilesInDirectory) {
        templateFilesInDirectory.map((fileData)=> {

            // Absolute path to file
            const absolutePath = `${templatePath}/${fileData}`

            // Filename
            const filePath = `${fileData}`

            // Don't overwrite the systen DS_Store file
            if (!/.DS_Store/gi.test(filePath)){
                const file = fs.readFileSync(absolutePath, 'utf8')
                fileArray.push({
                    src: file,
                    path: filePath
                })
            }
        })
    }
    return
}

module.exports = ProcessFiles