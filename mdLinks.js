const fs = require('fs');
const { join, extname } = require('path');

const showFiles = (resolve, reject, file) => {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return reject(`File not found ==> ${err}`);
        } else {
            let regex = /\[(.*?)\]?\(.*?\)/g;
            const result = data.match(regex);
            let array = [];
            result.map((link) => {
                const linkSplit = link.split(',');
                //AQUI VOCE PRECISA 
                linkSplit.forEach(function(link){
                    let text = link.replace('[', '');
                    let text1 = text.replace(']', '');
                   console.log(text1) 
                   const object = {
                    file: file,
                    text:text1,
                    href:text.replace(')', ''),
                };
                array.push(object);
                });                            
                return resolve(array);
            });
        };
    });
};

const mdLinks = (path) => {
    if (fs.lstatSync(path).isDirectory() !== undefined) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, function (err, files) {
                if (err) {
                    return reject(err);
                } else {
                    const filesMd = files.filter(function (file) {
                        return extname(file) === ".md";
                    });
                    if (filesMd.length === 0) {
                        return reject(`Arquivo não compatível`);
                    } else {
                        filesMd.forEach(function (file) {
                            const directoryPath = join(path, file);
                            showFiles(resolve, reject, directoryPath);
                        });
                    };
                };

            });
        });
    } else {
        return new Promise((resolve, reject) => {
            if (extname(path) !== ".md") {
                return reject(`Arquivo não compatível`);
            } else {
                showFiles(resolve, reject, path);
            };
        });
    };
};

module.exports = mdLinks;