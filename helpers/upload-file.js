const path = require('path');
const { v4: uuidv4 } = require('uuid');

const extensionAllowed = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF'];

const getExtension = (file) => {
    let extension = file.name.split('.');
    return extension[extension.length - 1];
}

const hasExtensionAllowed = (file) => {
    let extension = getExtension(file);
    return extensionAllowed.includes(extension);
}

const generateName = (file) => {
    return `${uuidv4()}.${getExtension(file)}`;
}

const uploadFile = (files, directory = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;

        if (!hasExtensionAllowed(file)) {
          return reject( `La extensión No es permitida, las permitidas son: ${extensionAllowed}`)
        }
        const newName = generateName(file);
        const uploadPath = path.join(__dirname, `../storage/${directory}/${newName}`);
        
        file.mv(uploadPath, (err) => {
            if (err) return reject(err);
            resolve(newName);
        });
    });

  
};

module.exports = uploadFile;