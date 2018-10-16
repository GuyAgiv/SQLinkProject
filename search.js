/*
* ASSIGNED BY : GUY AGIV
* */

const path = require('path'), fs = require('fs');


if(process.argv.length !== 4)
{
    console.log("USAGE: node search [EXT] [TEXT]")
}

else
{
    let results;
    const requiredExtension = process.argv[2];
    const requiredWord = process.argv[3];
    const fileNotFound = "No file was found";

    results = ExtractRelevantFilesByExtension(__dirname, requiredWord, requiredExtension);

    results.length === 0 ? console.log(fileNotFound) : console.log(results);
}

function ExtractRelevantFilesByExtension(directory, word, extension)
{
    let filesList = [];
    let desiredFilesList = [];


    // Recursive function , finding all files with the required extension (including subdirectories)
    function SearchRecursivelyDeeplyInDirectory(directory, extension)
    {
        fs.readdirSync(directory).forEach(object => {

            const objectFullPath = path.join(directory, object);

            const stat = fs.lstatSync(objectFullPath);

            if(stat.isDirectory())
            {
                SearchRecursivelyDeeplyInDirectory(objectFullPath,extension);
            }
            else
            {
                if(path.extname(objectFullPath) === "." + extension)
                {
                    filesList.push(objectFullPath);
                }


            }
        })
    }

    // Calling the internal function
    SearchRecursivelyDeeplyInDirectory(directory, extension);

    if(filesList.length !== 0)
    {
        // Iterating the filesList which includes only the desired extension we looked for through lambda expression
        filesList.forEach(file => {
            const fileContent = fs.readFileSync(file);
            if(fileContent.includes(word)) {
                desiredFilesList.push(file);
            }
        });
    }

    return desiredFilesList;
}