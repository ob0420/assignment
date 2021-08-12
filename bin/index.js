#! /usr/bin/env node

const fs = require('fs');

fs.readFile('./counts.json', 'utf-8', (err, jsonString) => {
  console.log(jsonString);
});
