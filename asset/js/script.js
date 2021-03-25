
url="https://eu-central-1.arterys.com/healthcheck"
fetch(url, {method: "GET",mode: "cors",redirect: "follow"}).then(function(response){
    if(response.ok){
        console.log(response.headers);
        console.log(response.body);
        response.blob().then(function(myBlob){
            console.log(myBlob);
        })
    }else{
        console.log("Erreur")
    }
});

var prod_status_content = document.getElementById('prod-status-content');
prod_status_content.style.maxHeight = prod_status_content.scrollHeight+"px";

var prod_status_click = document.getElementById('prod-status-click');
prod_status_click.addEventListener('click', function(){
    var prod_status_content = document.getElementById('prod-status-content');
    if(prod_status_content.style.maxHeight){
        prod_status_content.style.maxHeight = null;
    }else{
        prod_status_content.style.maxHeight = prod_status_content.scrollHeight+"px";
    }
});
