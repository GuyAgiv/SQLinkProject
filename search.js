/*
* ASSIGNED BY : GUY AGIV
* */

const path = require('path');
const fs = require('fs');
const helpMessageText = "USAGE: node search [EXT] [TEXT]";
const fileNotFound = "No file was found";

if(process.argv.length !== 4)
{
    console.log(helpMessageText);
}

else
{
    const requiredExtension = process.argv[2];
    const requiredWord = process.argv[3];

    result = ExtractRelevantFilesByExtension(__dirname, requiredWord, requiredExtension);

    if(!result)
    {
        console.log(fileNotFound);
    }
}

/**
 * @return {boolean}
 */
function ExtractRelevantFilesByExtension(directory, word, extension)
{
    let isMatchFound = false;

    // Recursive function , finding all files with the required extension and  (including subdirectories)
    function SearchRecursivelyDeeplyInDirectory(directory)
    {
        fs.readdirSync(directory).forEach(object => {

            const objectFullPath = path.join(directory, object);
            const stat = fs.lstatSync(objectFullPath);

            // The recursive step
            if(stat.isDirectory())
            {
                SearchRecursivelyDeeplyInDirectory(objectFullPath);
            }
            else
            {
                // The validation stage , looking if current file is fit for our requirements
                if(path.extname(objectFullPath) === "." + extension)
                {
                    const fileContent = fs.readFileSync(objectFullPath);
                    if(fileContent.includes(word))
                    {
                        isMatchFound = true;
                        console.log(objectFullPath);
                    }
                }
            }
        })
    }

    // Calling the internal function
    SearchRecursivelyDeeplyInDirectory(directory, extension);

    return isMatchFound;
}