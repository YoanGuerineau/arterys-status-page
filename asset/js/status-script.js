function fillProdStatus(region,http_code,content){
    var prod_status_content = document.getElementById('all-status-content');
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

regions=['us-east-1','eu-central-1','master','test','mica-6388'];

regions.forEach(region => {
    fetchHealthcheck(region);
});