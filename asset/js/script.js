function fillProdStatus(region,http_code,content){
    var prod_status_content = document.getElementById('prod-status-content');
    var div = document.createElement("div");
    div.className = "region-status-content";
    var p = document.createElement("p");
    var img = document.createElement("img");
    if(http_code === 200 && content === "OK"){
        p.innerText = region + " status: " + content;
        img.src = "./asset/img/check.png";
    }else{
        p.innerText = region + " status: NOT OK";
        img.src = "./asset/img/cross.png";
    }
    div.append(p,img);
    prod_status_content.appendChild(div);
    prod_status_content.style.maxHeight = prod_status_content.scrollHeight + "px";
}

function getHealthcheckUrl(region){
    return 'https://' + region + ".arterys.com/healthcheck";
}

function fetchHealthcheck(region){
    var url = getHealthcheckUrl(region);
    $.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent(url), function (data) {
        fillProdStatus(region,data.status.http_code,data.contents);
    });
}

function makeCollapsible(div){
    var collapsible_click = null;
    var collapsible_content = null;
    div.childNodes.forEach(child => {
        if(child.className === "collapsible-click"){
            collapsible_click = child;
        }else if(child.className === "collapsible-content"){
            collapsible_content = child;
        }
    })
    if(collapsible_click !== null && collapsible_content != null){
        var arrow_img = collapsible_click.getElementsByTagName('img')[0];
        collapsible_click.addEventListener('click', function(){
            if(collapsible_content.style.maxHeight){
                collapsible_content.style.maxHeight = null;
                arrow_img.style.transform = "rotate(90deg)";
            }else{
                collapsible_content.style.maxHeight = collapsible_content.scrollHeight + "px";
                arrow_img.style.transform = "";
            }
        });
        collapsible_content.style.maxHeight = collapsible_content.scrollHeight + "px";
    }
}

regions=['us-east-1','eu-central-1','master','test','mica-6388'];

regions.forEach(region => {
    fetchHealthcheck(region);
});

var collapsible_elements = document.getElementsByClassName("collapsible-container");

for(let i = 0; i < collapsible_elements.length; i++){
    makeCollapsible(collapsible_elements[i]);
}

function fillIssues(issue){
    var latest_issues_content = document.getElementById('latest-issues-content');
    var container = document.createElement('a');
    container.className = "issue";
    container.href = issue.html_url;

    var description = document.createElement('div');
    description.className = "issue-description";
    var title = document.createElement('span');
    title.className = "issue-title";
    title.innerText = issue.title.trim();
    var body = document.createElement('span');
    body.className = "issue-body";
    body.innerText = issue.body;
    var time = new Date(issue.created_at).toISOString().slice(0,19).split('T');
    var details = document.createElement('span');
    details.className = "issue-details";
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
    description.append(title);
    description.append(body);
    description.append(details);
    container.append(description);
    container.append(img);
    latest_issues_content.appendChild(container);
    latest_issues_content.style.maxHeight = latest_issues_content.scrollHeight + "px";
}

function insertSeparator(element){
    var separator = document.createElement('hr');
    separator.className = "separator";
    element.append(separator);
}

$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/issues?per_page=5&state=all', function (data) {
    var latest_issues_content = document.getElementById('latest-issues-content');
    data.forEach(issue => {
        fillIssues(issue);
        if(issue != data[data.length-1]){
            insertSeparator(latest_issues_content);
        }
    });
});

$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/contents/maintenance', function (data) {
    console.log(data);
});