while IFS= read line; do
    comments=jq -r '.[] | select(.number==52) | .comments' ./asset/json/issues.json
    if [[ "$comments" != "0" ]]; then
        wget https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$line/comments -O ./asset/json/comments/$line-comments.json
    fi
done <<< $(jq -r '.[].number' ./asset/json/issues.json)
