document.getElementById("time-left").innerText = "10:03"

const rain_var = document.getElementById("rain-var")

//RAW data
const light_RAW_var = document.getElementById("light-RAW-var")
const rain_RAW_var = document.getElementById("rain-RAW-var")
const wind_RAW_var = document.getElementById("wind-RAW-var")

const POST_var = document.getElementById("POST-var")
POST_var.innerText = "true"

setInterval(function()
{
    getTemperature();
    getHumidity();
    getLight();
    getWind();
    getRain();
}, 2000);


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
        light_RAW_var.innerHTML = this.responseText
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
        rain_RAW_var.innerHTML = this.responseText
        let value = this.responseText, valueString
        rain_var.style.color = ""

        if (value >= 1020){
            valueString = "Clear sky";
        } else if(value >= 800 && value < 1020){
            valueString = "Some droplets";
        } else if(value >= 600 && value < 800){
            valueString = "It's raining";
        } else if(value >= 50 && value < 600){
            valueString = "Heavy raining";
        } else if(value >= 0 && value < 50){
            valueString = "Metal on sensor";
            rain_var.style.color = "red"
        }

        rain_var.innerHTML =  valueString;
    }
    };
    DHT11Request.open("GET", "readR", true);
    DHT11Request.send();
}

function getWind(){
    var DHT11Request = new XMLHttpRequest();
    DHT11Request.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        wind_RAW_var.innerHTML = this.responseText
        document.getElementById("wind-var").innerHTML = this.responseText;
    }
    };
    DHT11Request.open("GET", "readW", true);
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
