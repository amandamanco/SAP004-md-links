const fs = require('fs');
const { join, extname } = require('path');
let array = [];

const showFiles = (resolve, reject, file) => {
  const data = fs.readFileSync(file, 'utf8');
  const regex = /(\[.[^[\](\)]*?\])(\([^#].*?\))/gm;
  const result = data.match(regex);
  if (result === null) {
    return reject(`No links here!`);
  } else {
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
};

const mdLinks = (path) => {
  if (fs.lstatSync(path).isDirectory()) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, function (err, files) {
        const filesMd = files.filter(function (file) {
          return extname(file) === '.md';
        });
        if (filesMd.length === 0) {
          return reject(`.md files not found in this directory`);
        } else {
          filesMd.map(function (files) {
            const replaceDirectory = join(path, files);
            const directoryPath = replaceDirectory.replace("\\", "/");
            showFiles(resolve, reject, directoryPath);
          });
        };
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      if (extname(path) !== '.md') {
        return reject(`.md file not found`);
      } else {
        showFiles(resolve, reject, path);
      };
    });
  };
};

module.exports = mdLinks;