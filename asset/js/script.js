function makeCollapsible(div){
    let collapsible_click = null;
    let collapsible_content = null;
    div.childNodes.forEach(child => {
        if(String(child.className).includes("collapsible-click")){
            collapsible_click = child;
        }else if(String(child.className).includes("collapsible-content")){
            collapsible_content = child;
        }
    })
    if(collapsible_click !== null && collapsible_content != null){
        let arrow_img = collapsible_click.getElementsByTagName('svg')[0];
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

const collapsible_elements = document.getElementsByClassName("collapsible-container");

for(let i = 0; i < collapsible_elements.length; i++){
    makeCollapsible(collapsible_elements[i]);
}

const regions = ['us-east-1', 'eu-central-1', 'master', 'test', 'mica-6388'];

//Filling the status
regions.forEach(region => {
    let prod_status_content = document.getElementById('prod-status-content');
    fetchHealthcheck(region, prod_status_content);
});

//Filling the maintenances
$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/issues?per_page=3&state=open&labels=maintenance', function (data) {
    const maintenances_content = document.getElementById('maintenances-content');
    fillIssues(data, maintenances_content);
});

//Filling the issues
$.getJSON('https://api.github.com/repos/yoanguerineau/arterys-status-page/issues?per_page=5&state=all&labels=displayed-issue', function (data) {
    const latest_issues_content = document.getElementById('latest-issues-content');
    fillIssues(data, latest_issues_content);
});
