function fillIssues(data,elem){
    if(elem == null){
        var elem = document.getElementById('latest-issues-content');
    }
    data.forEach(issue => {
        var container = document.createElement('a');
        container.className = "issue";
        container.href = issue.html_url;
        var title_div = document.createElement('div');
        title_div.className = "title issue-title";
        var title = document.createElement('span');
        title.innerText = issue.title.trim();
        var body = document.createElement('span');
        body.className = "issue-body";
        body.innerText = issue.body;
        var time = new Date(issue.created_at).toISOString().slice(0,19).split('T');
        var details = document.createElement('span');
        details.className = "details";
        details.innerText = "#" + issue.number + " opened the " + time[0] + " at " + time[1] + "(UTC) by " + issue.user.login
        var img = document.createElement('span');
        img.className = "issue-state";
        if (issue.state === "open"){
            img.innerHTML = 
            '<svg class="issue-opened" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">\
                <title>This issue is currently opened</title>\
                <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>\
            </svg>';
        }else if(issue.state === "closed"){
            img.innerHTML = 
            '<svg class="issue-closed" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">\
                <title>This issue is currently closed</title>\
                <path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 0110.65-5.003.75.75 0 00.959-1.153 8 8 0 102.592 8.33.75.75 0 10-1.444-.407A6.5 6.5 0 011.5 8zM8 12a1 1 0 100-2 1 1 0 000 2zm0-8a.75.75 0 01.75.75v3.5a.75.75 0 11-1.5 0v-3.5A.75.75 0 018 4zm4.78 4.28l3-3a.75.75 0 00-1.06-1.06l-2.47 2.47-.97-.97a.749.749 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0z"></path>\
            </svg>';
        }
        title_div.append(title);
        title_div.append(img);
        container.append(title_div);
        container.append(body);
        container.append(details);
        elem.appendChild(container);
        elem.style.maxHeight = elem.scrollHeight + "px";
        if(issue != data[data.length-1]){
            insertSeparator(elem);
        }
    });
}

function fillMaintenances(data){
    var maintenances_content = document.getElementById('all-maintenances-content');
    fillIssues(data,maintenances_content);
}

function insertSeparator(element){
    var separator = document.createElement('hr');
    separator.className = "separator";
    element.append(separator);
}

$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/issues?per_page=5&state=all&labels=maintenance', function (data) {
    fillMaintenances(data);
});;
