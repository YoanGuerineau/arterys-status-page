'use strict'

const fs = require('fs')
let raw_data = fs.readFileSync('./asset/json/displayed-issues.json')
let issues = JSON.parse(raw_data)
console.log(issues)
