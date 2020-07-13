#!/usr/bin/env node
const mdLinks = require('./index');

mdLinks(process.argv[2])
  .then(arr => {
    arr.forEach(obj => {
      console.log(`File: ${obj.file} | Text: ${obj.text} | Href: ${obj.href}`);
    });
  })
  .catch(err => console.log(err));