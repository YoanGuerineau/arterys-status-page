'use strict'

const fs = require('fs');
const args = process.argv.slice(2);

let raw_data = fs.readFileSync(args[0]);
let issues = JSON.parse(raw_data);

issues.forEach( issue => {
  const result_json = JSON.stringify(cleanup_issue(issue), null, 2)
  console.log(result_json)
  fs.writeFileSync(args[0], result_json);
})

function cleanup_issue(issue) {
  const parsed_body = parse_body(issue.body);
  return Object({
    html_url: issue.html_url,
    number: issue.number,
    title: issue.title,
    user: Object({login: issue.user.login}),
    state: issue.state,
    comments: issue.comments,
    created_at: issue.created_at,
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
    line = line.trim()
    if (line.startsWith("starting_datetime:")) {
      starting_datetime = line.split("starting_datetime:")[1].trim();
    } else if (line.startsWith("estimated_duration:")) {
      estimated_duration = line.split("estimated_duration:")[1].trim();
    } else {
      description += line;
    }
    if (description !== "" && lines.length > index + 1 && !lines[index + 1].startsWith("starting_datetime:") && !lines[index + 1].startsWith("estimated_duration:")) {
      description += "\n";
    }
  });
  return Object({
    description: description,
    starting_datetime: starting_datetime,
    estimated_duration: estimated_duration,
  });
}
