function fill_html(region,http_code,content){
    var prod_status_content = document.getElementById('prod-status-content');
    var div = document.createElement("div");
    div.className = "region-status-content";
    var p = document.createElement("p");
    p.innerText=region+" status: "+content;
    if(http_code===200 && content==="OK"){
        var img = document.createElement("img");
        img.src="./asset/img/check.png";
    }else{
        var img = document.createElement("img");
        img.src="./asset/img/cross.png";
    }
    div.append(p,img);
    prod_status_content.appendChild(div);
    prod_status_content.style.maxHeight = prod_status_content.scrollHeight+"px";
}

function get_healthcheck_url(region){
    return 'https://'+region+".arterys.com/healthcheck";
}

function fetch_healthcheck(region){
    var url = get_healthcheck_url(region);
    $.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent(url), function (data) {
        fill_html(region,data.status.http_code,data.contents);
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
                arrow_img.style.transform="rotate(90deg)";
            }else{
                collapsible_content.style.maxHeight = collapsible_content.scrollHeight+"px";
                arrow_img.style.transform="";
            }
        });
        collapsible_content.style.maxHeight = collapsible_content.scrollHeight+"px";
    }
}

regions=['us-east-1','eu-central-1','test'];

regions.forEach(region => {
    fetch_healthcheck(region);
});

var collapsible_elements = document.getElementsByClassName("collapsible-container");

for(let i=0;i<collapsible_elements.length;i++){
    makeCollapsible(collapsible_elements[i]);
}