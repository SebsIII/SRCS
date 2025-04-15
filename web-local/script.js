
document.getElementById("time-left").innerText = "10:03"

//document.getElementById("temperature-var").innerText = 32

/*
setInterval(function()
{
    getTemperature();
    getHumidity();
    getLight();
    getRain();
}, 2000);
*/

function getTemperature()
{
    var DHT11Request = new XMLHttpRequest();
    DHT11Request.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        document.getElementById("temperature-var").innerHTML = this.responseText;
    }
    };
    DHT11Request.open("GET", "readT", true);
    DHT11Request.send();
}

function getHumidity()
{
    var DHT11Request = new XMLHttpRequest();
    DHT11Request.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        document.getElementById("humidity-var").innerHTML = this.responseText;
    }
    };
    DHT11Request.open("GET", "readH", true);
    DHT11Request.send();
}

function getLight(){
    var DHT11Request = new XMLHttpRequest();
    DHT11Request.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        document.getElementById("light-var").innerHTML = this.responseText;
    }
    };
    DHT11Request.open("GET", "readL", true);
    DHT11Request.send();
}

function getRain(){
    var DHT11Request = new XMLHttpRequest();
    DHT11Request.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        document.getElementById("rain-var").innerHTML = this.responseText;
    }
    };
    DHT11Request.open("GET", "readR", true);
    DHT11Request.send();
}

function getSRCS(){
    var DHT11Request = new XMLHttpRequest();
    DHT11Request.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        document.getElementById("POST-var").innerHTML = this.responseText;
    }
    };
    DHT11Request.open("GET", "readSRCS", true);
    DHT11Request.send();
}

function getGeneral(){
    var DHT11Request = new XMLHttpRequest();
    DHT11Request.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        //document.getElementById("POST-var").innerHTML = this.responseText;
        //format
    }
    };
    DHT11Request.open("GET", "readGENERAL", true);
    DHT11Request.send();
}

function updateN2YO(){
    //fetch from n2yo api
    console.log("wait a sec, not done yet")
    return
}