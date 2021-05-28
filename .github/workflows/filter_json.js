'use strict'

const fs = require('fs')
let raw_data = fs.readFileSync('./asset/json/displayed-issues.json')
let issues = JSON.parse(raw_data)
issues.forEach( (issue,index) => {
  console.log(JSON.stringify(clean_object(issue)))
  //console.log(index)
})

function clean_object(object) {
  let labels = object.labels
  labels.forEach( (label,index) => { 
    labels[index] = Object(label.name)
  })
  return Object(object.html_url,object.comments_url,object.number,object.title,object.user.login,labels,object.state,object.comments,object.created_at,object.body)
}
