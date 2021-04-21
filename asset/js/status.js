function fillStatus(region, data, elem){
    let http_code = data.status.http_code;
    let content = data.contents;
    let div = document.createElement("div");
    div.className = "region-status-content";
    let p = document.createElement("p");
    let img = document.createElement("span");
    img.className = "icon";
    if(http_code === 200 && content === "OK"){
        p.innerText = region + ": OK";
        img.innerHTML = 
        '<svg id="mf-check-circle" viewBox="0 0 14 14">\
            <path d="M 10.4 4.3 l -4 6 a 0.5 0.5 0 0 1 -0.8 0 l -2 -3 a 0.5 0.5 0 0 1 0.7 -0.7 l 1.8 0.9 l 3.6 -3.8 a 0.5 0.5 0 0 1 0.8 0.6 M 7 0 a 7 7 0 1 0 0 14 a 7 7 0 0 0 0 -14"></path>\
        </svg>';
    }else{
        p.innerText = region + ": down";
        img.innerHTML = 
        '<svg id="mf-cross-s" viewBox="0 0 14 14">\
            <path d="M 7 0 C 3.1 0 0 3.1 0 7 s 3.1 7 7 7 s 7 -3.1 7 -7 s -3.1 -7 -7 -7 z m 3.7 9.3 l -1.4 1.4 L 7 8.4 l -2.3 2.3 l -1.4 -1.4 L 5.6 7 L 3.3 4.7 l 1.4 -1.4 L 7 5.6 l 2.3 -2.3 l 1.4 1.4 L 8.4 7 l 2.3 2.3 z"></path>\
        </svg>';
    }
    div.append(p, img);
    elem.appendChild(div);
    elem.style.maxHeight = elem.scrollHeight + "px";
}

function getHealthcheckUrl(region){
    return 'https://' + region + ".arterys.com/healthcheck";
}

function fetchHealthcheck(region, elem){
    let url = getHealthcheckUrl(region);
    /*  Maybe this will be changed to $.getJSON(url, ... 
        allorigins api was used because of the CORS restrictions on web servers
        */
    $.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent(url), function (data) {
        fillStatus(region, data, elem);
    });
}