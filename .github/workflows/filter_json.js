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
  return Object({
    html_url: object.html_url,
    comments_url: object.comments_url,
    number: object.number,
    title: object.title,
    login: object.user.login,
    labels: labels,
    state: object.state,
    comments: object.comments,
    created_at: object.created_at,
    body: object.body,
  })
}
