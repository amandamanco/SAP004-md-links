const fs = require('fs');
const { join, extname } = require('path');
let array = [];

const showFiles = (resolve, reject, file) => {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return reject(`File not found`);
    } else {
      let regex = /(\[.[^[\](\)]*?\])(\([^#].*?\))/gm;
      const result = data.match(regex);
      result.map(function (link) {
        let clearText = link.replace('[', '');
        let clearLink = clearText.replace('(', '');
        let clearLinkTwo = clearLink.replace(')', '');
        let clearAll = clearLinkTwo.split(']');
        const object = {
          file: file,
          text: clearAll[0],
          href: clearAll[1],
        };
        array.push(object);
      });
    };
    return resolve(array);
  });
};

const mdLinks = (path) => {
  if (fs.lstatSync(path).isDirectory()) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, function (err, files) {
        if (err) {
          return reject(err);
        } else {
          const filesMd = files.filter(function (file) {
            return extname(file) === ".md";
          });
          if (filesMd.length === 0) {
            return reject(`.md files not found`);
          } else {
            filesMd.forEach(function (files) {
              const directoryPath = join(path, files);
              showFiles(resolve, reject, directoryPath);
            });
          };
        };
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      if (extname(path) !== ".md") {
        return reject(`.md file not found`);
      } else {
        showFiles(resolve, reject, path);
      };
    });
  };
};

module.exports = mdLinks;