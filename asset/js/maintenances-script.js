$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/issues?per_page=5&state=all&labels=maintenance', function (data) {
    const maintenances_content = document.getElementById('all-maintenances-content');
    fillIssues(data, maintenances_content);
});
