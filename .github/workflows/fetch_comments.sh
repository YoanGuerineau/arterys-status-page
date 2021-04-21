while IFS= read line; do
    wget https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$line -O ./asset/json/comments/$line-comments.json
done <<< $(cat ./asset/json/issues.json | jq -r '.[].number')