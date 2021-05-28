'use strict'

const fs = require('fs');
let raw_data = fs.readFileSync('./asset/json/displayed-issues.json');
let issues = JSON.parse(raw_data);
issues.forEach( (issue,index) => {
  console.log(JSON.stringify(clean_object(issue), null, 2));
  //console.log(index)
})

function clean_object(object) {
  const parsed_body = parse_body(object.body);
  return Object({
    html_url: object.html_url,
    number: object.number,
    title: object.title,
    user: Object({login: object.user.login}),
    state: object.state,
    comments: object.comments,
    created_at: object.created_at,
    body: parsed_body.description,
    starting_datetime: parsed_body.starting_datetime,
    estimated_duration: parsed_body.estimated_duration,
  });
}

function parse_body(body) {
  const lines = body.split("\n");
  let description = "";
  let starting_datetime = null;
  let estimated_duration = null;
  lines.forEach( (line,index) => {
    if (line.startsWith("starting_datetime:")) {
      starting_datetime = line.split("starting_datetime:");
    } else if (line.startsWith("estimated_duration:")) {
      estimated_duration = line.split("estimated_duration:");
    } else {
      description += line;
    }
    if (description !== "" && lines.length > index + 1 && !lines[index + 1].startsWith("starting_datetime:") && !lines[index + 1].startsWith("estimated_duration:")) {
      description += "\n";
    }
  }
  return Object({
                description: description,
                starting_datetime: starting_datetime,
                estimated_duration: estimated_duration,
                });
}
