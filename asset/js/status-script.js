function fillProdStatus(region,http_code,content){
    var prod_status_content = document.getElementById('all-status-content');
    var div = document.createElement("div");
    div.className = "region-status-content";
    var span = document.createElement("span");
    var img = document.createElement("img");
    if(http_code === 200 && content === "OK"){
        span.innerText = region + " status: " + content;
        img.src = "./asset/img/check.png";
    }else{
        span.innerText = region + " status: NOT OK";
        img.src = "./asset/img/cross.png";

    }
    div.append(span,img);
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

regions=['us-east-1','eu-central-1','master','test','mica-6388'];

regions.forEach(region => {
    fetchHealthcheck(region);
});