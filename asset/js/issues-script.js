$.getJSON('./asset/json/displayed-issues.json', function (data) {
    const all_issues_content = document.getElementById('all-issues-content');
    fillIssues(data, all_issues_content);
});
