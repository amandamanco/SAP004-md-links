const fs = require('fs');

const mdLinks = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, file) => {
            if (error) {
                return reject(`File not found`);
            } else {
                let regex = /\[(.*?)\]/g;
                const result = file.match(regex);
                let array = [];
                result.map((link) => {
                    const text = "text";
                    const object = {
                        file: path,
                        text: text,
                        href: link,
                    };
                    array.push(object);
                    return resolve(array);
                });

            };
        });
    });
};

module.exports = mdLinks;

