const urlParams = new URLSearchParams(window.location.search);
const issue_id = urlParams.get('issue_id');
const issue_header = document.getElementById('individual-issue-header');
$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/issues/'+issue_id, function (issue) {
    fillIssues([issue],issue_header,individual=true);
});

const issue_comments = document.getElementById('individual-issue-comments');
$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/issues/'+issue_id+"/comments", function (comments) {
    fillComments(comments,issue_comments);
});