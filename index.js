#!/usr/bin/env node

const mdLinks = require('./mdLinks');

mdLinks(process.argv[2])
.then (array => {
  if (typeof array === 'undefined' ) {
    console.log("Não há links aqui");
  } else {
    array.forEach(obj => {
      console.log(`File: ${obj.file} | Text: ${obj.text} | Href: ${obj.href}`);
    });
  };
})
.catch (error => console.log(error));


// const program = require('commander');
// const package = require('./package.json');
// const { join } = require('path');
// const links = require('./mdLinks');
// const mdLinks = links.mdLinks();

// const linkDefault = join(__dirname, './README.md');

// program.version(package.version);

// program.arguments('[path]').action(function (path) {
//   if (typeof path === 'undefined') {
//     links(linkDefault)
//     process.exit(1);
//   }
//   links(path);
// });