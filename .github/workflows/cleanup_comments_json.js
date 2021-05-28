'use strict'

const fs = require('fs');
const args = process.argv.slice(2);

args.forEach( file => {
  const raw_data = fs.readFileSync("./asset/json/comments/" + file);
  const comment = JSON.parse(raw_data);

  cleanup_comment(comment);

  const result_json = JSON.stringify(comment, null, 2);
  console.log(result_json)
  fs.writeFileSync("./asset/json/comments/" + file, result_json);  
});


function cleanup_comment(comment) {
  return Object({
    id: comment.id,
    body: comment.body,
    user: Object({login: comment.user.login}),
    created_at: comment.created_at,
  });
}
