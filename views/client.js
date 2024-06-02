function refresh(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            let reports = JSON.parse(this.responseText);
            let result = "";
            for (let i = 0; i < reports.length; i++){
                result += `<div class=reportFormat>`
                result += `<h3>${reports[i].type} <br>`
                result += `<label>Location of Sighting: ${reports[i].location} <br>`
                result += `<label> Report submitted by: ${reports[i].name}<br>`
                result += `</div>`
            }
            document.getElementById("monitorBox").innerHTML = result;
        }
    }
    //Send a GET request to the server
    request.open("GET", `/updateMonitoring`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify());
}


function postReport(){
    let request = new XMLHttpRequest();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let type = document.getElementById("type").value;
    let sightingLocation = document.getElementById("sightingLocation").value;
    request.open("POST", "/postReport", true)
    request.send(JSON.stringify({"name": name, "email": email, "type": type, "location": sightingLocation}))
}

