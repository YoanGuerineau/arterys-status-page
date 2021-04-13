$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/issues?state=all&labels=displayed-issue', function (data) {
    const all_issues_content = document.getElementById('all-issues-content');
    fillIssues(data, all_issues_content);
});
