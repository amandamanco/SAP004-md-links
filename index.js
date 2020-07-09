const fs = require('fs');
const { join, extname } = require('path');

const showFiles = (resolve, reject, file) => {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return reject(`File not found ${err}`);
    } else {
      let regex = /(\[.[^[\](\)]*?\])(\([^#].*?\))/gm;
      const result = data.match(regex);
      let array = [];
      result.map((link) => {
        const linkSplit = link.split(',');
        linkSplit.forEach(function (link) {
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
        return resolve(array);
      });
    };
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