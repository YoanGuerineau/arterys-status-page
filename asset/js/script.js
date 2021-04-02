function fillProdStatus(region,http_code,content){
    var prod_status_content = document.getElementById('prod-status-content');
    var div = document.createElement("div");
    div.className = "region-status-content";
    var p = document.createElement("p");
    var img = document.createElement("span");
    if(http_code === 200 && content === "OK"){
        p.innerText = region + " status: " + content;
        img.innerHTML = 
        '<svg id="mf-check-circle" viewBox="0 0 18 18">\
            <path d="M10.416 4.277l-4 6a.5.5 0 01-.833 0l-2-3a.5.5 0 01.651-.718l1.765.94 3.637-3.843a.5.5 0 01.78.62M6.999 0a7 7 0 100 14 7 7 0 000-14"></path>\
        </svg>'
    }else{
        p.innerText = region + " status: NOT OK";
        img.innerHTML = 
        '<svg id="mf-cross-s" viewBox="0 0 18 18">\
            <path d="M9 2C5.1 2 2 5.1 2 9s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm3.7 9.3l-1.4 1.4L9 10.4l-2.3 2.3-1.4-1.4L7.6 9 5.3 6.7l1.4-1.4L9 7.6l2.3-2.3 1.4 1.4L10.4 9l2.3 2.3z"></path>\
        </svg>'
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
        if(String(child.className).includes("collapsible-click")){
            collapsible_click = child;
        }else if(String(child.className).includes("collapsible-content")){
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
    var maintenances_content = document.getElementById('maintenances-content');
    fillIssues(data,maintenances_content);
}

function insertSeparator(element){
    var separator = document.createElement('hr');
    separator.className = "separator";
    element.append(separator);
}

$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/issues?per_page=5&state=all&labels=displayed-issue', function (data) {
    console.log(data);
    fillIssues(data);
});

$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/issues?per_page=5&state=open&labels=maintenance', function (data) {
    console.log(data);
    fillMaintenances(data);
});;
