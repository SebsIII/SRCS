
//SETUP
const main = document.querySelector("main")
const popup_wrapper = document.getElementById("popup-wrapper")
const popup_div = document.getElementById("popup-div")
const popup_psw = document.getElementById("popup-psw")

const antenna_animation = document.getElementById("antenna-animation")

const loading_popup_div = document.getElementById("loading-popup-div")

const align_popup_wrapper = document.getElementById("align-popup-wrapper")
const align_popup_div = document.getElementById("align-popup-div")

const from_input = document.getElementById("from-input")
const to_input = document.getElementById("to-input")
const for_input = document.getElementById("for-input")
const after_input = document.getElementById("after-input")

//BTNS
const align_btn = document.getElementById("align-antenna-btn")
const popup_btn = document.getElementById("popup-btn") 
const setup_btns = document.querySelectorAll(".setup-btns")
const send_cmmd_btn = document.getElementById("send-cmmd-btn")

//RAW data
const light_RAW_var = document.getElementById("light-RAW-var")
const rain_RAW_var = document.getElementById("rain-RAW-var")
const wind_RAW_var = document.getElementById("wind-RAW-var")

//GENERAL data
const AA_var = document.getElementById("AA-var")
const AD_var = document.getElementById("AD-var")
const POST_var = document.getElementById("POST-var")

const rain_var = document.getElementById("rain-var")

POST_var.innerText = "true"
AD_var.innerHTML = "counter-clockwise"

//VARS
var selectedCmmd;

/*
setInterval(function()
{
    getGeneral();
    getTemperature();
    getHumidity();
    getLight();
    getWind();
    getRain();
}, 2000);

*/

setup_btns.forEach((btn) => {
    btn.addEventListener("click",() => {
        selectedCmmd = btn.id
        popup_wrapper.style.display = "flex"
        popup_div.style.display = "flex"
        setTimeout(() => {
            popup_wrapper.style.backdropFilter = "blur(5px) brightness(90%)" 
            popup_div.style.opacity = "100%"
        }, 30)
    })
})

popup_btn.addEventListener("click", async () => {
    var psw = popup_psw.value
    if(psw){
        if(selectedCmmd){
            console.log(selectedCmmd)
            console.log(popup_psw.value)
            popup_psw.value = ""
            //const output = await ReqMaker(`pswReq/${psw}`)
            const output = "true" //output flag
            if (output == "true"){
                if(selectedCmmd == "align-antenna-btn"){
                    popup_div.style.display = "none"
                    align_popup_div.style.display = "none"    
                    align_popup_div.style.display = "flex"
                    setTimeout(() => {
                        align_popup_div.style.opacity = "100%"
                    }, 30)

                }
                else if(selectedCmmd == "align-north-btn"){
                    alignAntennaTo0() // <-- should continue to run commands after since is async, check though
                    showLoading()
                }
                
                
            }
            else{
                location.href = ""
            }
        }
    }
})

send_cmmd_btn.addEventListener("click",async () => {
    let from_value = Math.abs(from_input.value)
    let to_value = Math.abs(to_input.value)
    let for_value = Math.abs(for_input.value)
    let after_value = Math.abs(after_input.value)

    if(from_value != "" && to_value != "" && for_value != "" && after_value != ""){
        if(from_value == to_value){
            alert("error: from_value = to_value")
            location.href = ""
        } 
        else if(for_value == 0){
            alert("error: for_value = 0")
            location.href = ""
        }
        else{
            console.log(`alignCmmd/${from_value}/${to_value}/${for_value}/${after_value}`) // delete that after testing
            let output = await ReqMaker(`alignCmmd/${from_value}/${to_value}/${for_value}/${after_value}`)
            //manage output
            align_popup_div.style.display = "none"
            showLoading()
            console.log(output)
        }
    }



})


async function ReqMaker(request){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.open("GET", request, false);
    SRCSRequest.send();

    if (SRCSRequest.status === 200 && SRCSRequest.responseText !== null) {
        return SRCSRequest.responseText;
    }
}
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
        var angle = this.responseText
        AA_var.innerHTML = angle
        antenna_animation.style.transform = `rotate(${int(angle)}deg)`
    }
    };
    SRCSRequest.open("GET", "readGENERAL", true);
    SRCSRequest.send();
}

function alignAntennaTo0(){
    var SRCSRequest = new XMLHttpRequest();
    SRCSRequest.onreadystatechange = function()
    {
        if(this.readyState == 3 && this.status == 200){   // <-- 2 means "header received", 3 "loading", which one's better?
            console.log("req sent and received.")
        }
        else if(this.readyState == 4 && this.status == 200 && this.responseText != null)
        {
            console.log("Antenna aligned to N.")
        }
    };
    SRCSRequest.open("GET", "alignAntennaTo0", true); 
    SRCSRequest.send();
}

function showLoading(){
    popup_wrapper.style.cursor = "wait"
    popup_div.style.display = "none"    
    loading_popup_div.style.display = "flex"
    setTimeout(() => {
        loading_popup_div.style.opacity = "100%"
    }, 30)
}