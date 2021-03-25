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
        console.log(data.status.http_code);
        console.log(data.contents);
        fill_html(region,data.status.http_code,data.contents);
    });
}

regions=['us-east-1','eu-central-1','test'];

regions.forEach(region => {
    fetch_healthcheck(region);
});

var prod_status_click = document.getElementById('prod-status-click');
prod_status_click.addEventListener('click', function(){
    var prod_status_content = document.getElementById('prod-status-content');
    var arrow_img = prod_status_click.getElementsByTagName('img')[0];
    if(prod_status_content.style.maxHeight){
        prod_status_content.style.maxHeight = null;
        arrow_img.style.transform="rotate(90deg)";
    }else{
        prod_status_content.style.maxHeight = prod_status_content.scrollHeight+"px";
        arrow_img.style.transform="";
    }
});
