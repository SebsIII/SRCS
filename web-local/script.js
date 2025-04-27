document.getElementById("time-left").innerText = "10:03"

const rain_var = document.getElementById("rain-var")

//RAW data
const light_RAW_var = document.getElementById("light-RAW-var")
const rain_RAW_var = document.getElementById("rain-RAW-var")
const wind_RAW_var = document.getElementById("wind-RAW-var")

//GENERAL data
const AA_var = document.getElementById("AA-var")
const AD_var = document.getElementById("AD-var")
const POST_var = document.getElementById("POST-var")

//N2YO data
const NORAD_var = document.getElementById("NORAD-var")
const el_var = document.getElementById("el-var")
const passes_var = document.getElementById("passes-var")
const sAz_var = document.getElementById("startAz-var")
const maxAz_var = document.getElementById("maxAz-var")
const eAz_var = document.getElementById("endAz-var")
const sTime_var = document.getElementById("sTime-var")
const eTime_var = document.getElementById("eTime-var")

POST_var.innerText = "true"
AD_var.innerHTML = "counter-clockwise"

let satellites = {
    25338: "NOAA15",
    28654: "NOAA18",
    33591: "NOAA19"
}

//HIDE THOSE IN GITHUB
let observer_lat = "1323.13" 
let observer_lng = "41.321"
let observer_alt = "102"
let apiKey = "APIKEY"

setInterval(function()
{
    getGeneral();
    getTemperature();
    getHumidity();
    getLight();
    getWind();
    getRain();
}, 2000);


function getTemperature()
{
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        document.getElementById("temperature-var").innerHTML = this.responseText;
    }
    };
    SRCSRequest.open("GET", "readT", true);
    SRCSRequest.send();
}

function getHumidity()
{
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        document.getElementById("humidity-var").innerHTML = this.responseText;
    }
    };
    SRCSRequest.open("GET", "readH", true);
    SRCSRequest.send();
}

function getLight(){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        light_RAW_var.innerHTML = this.responseText
        document.getElementById("light-var").innerHTML = this.responseText;
    }
    };
    SRCSRequest.open("GET", "readL", true);
    SRCSRequest.send();
}

function getRain(){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
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
    SRCSRequest.open("GET", "readR", true);
    SRCSRequest.send();
}

function getWind(){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        wind_RAW_var.innerHTML = this.responseText
        document.getElementById("wind-var").innerHTML = this.responseText;
    }
    };
    SRCSRequest.open("GET", "readW", true);
    SRCSRequest.send();
}

function getSRCS(){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        document.getElementById("POST-var").innerHTML = this.responseText;
    }
    };
    SRCSRequest.open("GET", "readSRCS", true);
    SRCSRequest.send();
}

function getGeneral(){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        AA_var.innerHTML = this.responseText
    }
    };
    SRCSRequest.open("GET", "readGENERAL", true);
    SRCSRequest.send();
}

function updateN2YO(){
    //fetch from n2yo api
    console.log("wait a sec, not done yet")
    
    var noradID;
    var isValid = false;
    var i = 0;
    while(!isValid){
        noradID = satellites[i];
        var reqUrl = `https://api.n2yo.com/rest/v1/satellite/radiopasses/${noradID}/${observer_lat}/${observer_lng}/${observer_alt}/1/0&apiKey=${apiKey}`

        i += 1
    }

    return
}

function alignAntennaTo0(){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
    if(this.readyState == 4 && this.status == 200 && this.responseText != null)
    {
        console.log("Antenna-align-to-0 sent and received.")
    }
    };
    SRCSRequest.open("GET", "alignAntennaTo0", true); // add formatting of url
    SRCSRequest.send();
}