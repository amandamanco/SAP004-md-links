#!/usr/bin/env node

const program = require('commander');
const package = require('./package.json');
const { join } = require('path');
const links = require('./data');
const mdLinks = links.mdLinks();

const linkDefault = join(__dirname, './README.md');

program.version(package.version);

program.arguments('[path]').action(function (path) {
  if (typeof path === 'undefined') {
    links(linkDefault)
    process.exit(1);
  }
  links(path);
});

program.parse(process.argv);