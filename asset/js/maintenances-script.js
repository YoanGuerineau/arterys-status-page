$.getJSON('./asset/json/maintenances.json', function (data) {
    const maintenances_content = document.getElementById('all-maintenances-content');
    fillIssues(data, maintenances_content);
});
